<?php

namespace Application\Service;

use Application\Mapper\PostsMapper;
use Application\Filter\ContactFilter;

class PagesService
{

    /**
     * @var $mapper
     */
	private $mapper;


    /**
     * Pages Constructor
     * 
     * @param PostsMapper $mapper [description]
     */
	public function __construct(PostsMapper $mapper)
	{
		$this->mapper = $mapper;
	}

    /**
     * Fetch all posts
     *
     * @return [type] [description]
     */
	public function fetchAll()
	{
		return $this->mapper->fetchAll('post_id DESC');
	}

    /**
     * Fetch where
     *
     * @return [type] [description]
     */
	public function fetchByTitle($postTitle)
	{
		return $this->mapper->fetchWhere(['post_url_slug' => $postTitle]);
	}	

    /**
     * Post exists
     *
     * @return [type] [description]
     */
	public function postTitleExists($postTitle)
	{
		return $this->mapper->entryExists(['post_url_slug' => $postTitle]);
	}	


    /**
     * Contact handler
     *
     * @return [type] [description]
     */
	public function contactForm($post)
	{

        $filter      = new ContactFilter();
        $filterCheck = $filter->getInputFilter()->setData($post);

        if (!$filterCheck->isValid()) {
            return ['error', $filter->getMessages()];
        }

        // TODO
        // Mail system here blah..
	    return true;

	}
    
    /**
     * Search posts in table
     * 
     * @param  [type] $title [description]
     * @return [type]        [description]
     */
	public function searchPost($title)
	{
		return $this->mapper->search($title);
	}
}