<?php

namespace Application\Mapper;

use Zend\Db\Adapter\Adapter;
use Zend\Db\Adapter\AdapterAwareInterface;
use Zend\Db\ResultSet\HydratingResultSet;
use Zend\Db\TableGateway\AbstractTableGateway;
use Application\Entity\Comments;

class CommentsMapper extends AbstractTableGateway
{

	/**
	 * @var string
	 */
	protected $table = 'comments';


    /**
     * Comments database 
     * @param Adapter            $adapter   [ Zend DB Adapter class ]
     * @param HydratingResultSet $resultSet [ Zend DB Result Set ]
     */
	public function __construct(Adapter $adapter, HydratingResultSet $resultSet)
	{
		$this->resultSetPrototype = $resultSet;
		$this->adapter = $adapter;
		$this->initialize();
	}

    /**
     * Fetches all comments where their respective post_id
     * 
     * @param  [type] $postId [description]
     * @return [type]         [description]
     */
	public function fetchAll($postId)
	{
		$select = $this->getSql()->select()->where(['comment_post_id' => $postId])->order('comment_id DESC');
		return $this->selectWith($select);
	}	

    /**
     * Fetches last comment
     * 
     * @param  [type] $postId [description]
     * @return [type]         [description]
     */
	public function fetchLatest($postId)
	{
		$select = $this->getSql()->select()->where(['comment_post_id' => $postId])->order('comment_id DESC')->limit(1);
		return $this->selectWith($select);
	}

    /**
     * Create new comment in db according to the post id
     * 
     * @param Comments  $comment
     * @param [int] $post_id 
     * return [bool]
     */
	public function add(Comments $comment, $post_id)
	{

        if (empty($post_id)) {
		    return false;
        }		

		$data = [
	        'comment_post_id'  => (int)    $post_id,
	        'comment_email'    => (string) $comment->getEmail(),
	        'comment_name'     => (string) $comment->getName(),
	        'comment_created'  => (string) $comment->getCreated(),
	        'comment_body'     => (string) $comment->getBody(),
		];

		unset($data['comment_created']);

        return $this->insert($data);

	}


}