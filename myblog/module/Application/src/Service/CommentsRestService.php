<?php

namespace Application\Service;

use Application\Mapper\CommentsMapper;
use Application\Filter\CommentsFilter;
use Application\Entity\Comments;

class CommentsRestService 
{

    /**
     * @var $filter
     */
    public $filter;

    /**
     * @var $comments
     */
    public $mapper;

    /**
     * Comments Constructor
     *
     * @param CommentsMapper $comments
     * @param CommentsFilter $filter
     */
    public function __construct(CommentsMapper $comments, CommentsFilter $filter)
    {
        $this->mapper = $comments;
        $this->filter   = $filter;
    }

    /**
     * All comments from post id
     * 
     * @param  [type] $postId [description]
     * @return [type]         [description]
     */
    public function allComments($postId)
    {
	    return $this->mapper->fetchAll($postId);
    }

    /**
     * Add post then return last id from db
     * 
     * @param [type] $post [description]
     * @param [type] $id   [description]
     */
    public function addThenFetch($post, $id)
    {
        $filter = $this->filter->getInputFilter()->setData($post);

        if (!$filter->isValid()) {
            return ['error', $filter->getMessages()];
        }

        $post = $filter->getValues();

        $entity = new Comments();
        $entity->exchangeArray($post);
        $this->mapper->add($entity, $id);
        
        return $this->mapper->fetchLatest($id);
    }

}