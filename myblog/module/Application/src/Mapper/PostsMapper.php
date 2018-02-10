<?php

namespace Application\Mapper;

use Zend\Db\Adapter\Adapter;
use Zend\Db\Adapter\AdapterAwareInterface;
use Zend\Db\ResultSet\HydratingResultSet;
use Zend\Db\TableGateway\AbstractTableGateway;
use Zend\Db\Sql\Predicate\Where;
use Zend\Db\Sql\Sql;

use Application\Entity\Posts;

class PostsMapper extends AbstractTableGateway
{

    /**
     * @var string
     */
    protected $table = 'posts';


    /**
     * Posts table constructor
     * 
     * @param Adapter            $adapter 
     * @param HydratingResultSet $resultSet 
     */
    public function __construct(Adapter $adapter, HydratingResultSet $resultSet)
    {
        $this->resultSetPrototype = $resultSet;
        $this->adapter            = $adapter;
        $this->initialize();
    }


    /*
     * Select all
     * 
     * @return [ResultSet object]
     */
    public function fetchAll($order)
    {
        $select = $this->getSql()->select()->order($order);
        return $this->selectWith($select);
    }


    /**
     * Fetch by where clause
     * 
     * @param array $where
     * @return [ResultSet object]
     */
    public function fetchWhere(array $where)
    {
        $select = $this->getSql()->select()->where($where)->limit(1);
        return $this->selectWith($select);
    }

    /**
     * Selects last id 
     * 
     * @return array
     */
    public function fetchLast()
    {
        $select = $this->getSql()->select()->order('post_id DESC')->limit(1);
        return $this->selectWith($select); 
    }


    /**
     * Checks if entry exists with where clause
     * 
     * @param array $where
     * @return [bool]
     */
    public function entryExists(array $where)
    {
        $find       = $this->getSql()->select()->where($where);
        $selectWith = $this->selectWith( $find );

        return $selectWith->current() ? true : false;
    }

    /**
     * Checks if entry exists with where clause
     * 
     * @param array $data
     * @param int   $postId
     * @return [bool]
     */
    public function updateField(array $data, $postId)
    {
        $this->update($data, ['post_id' => $postId]);
        return true;
    }

    /**
     * Deletes the post by id, then deletes comments by their respective id 
     * from comments table
     * 
     * @param  [int] $post_id
     *
     *         Ovde si se nesto zbunio??
     */
    public function deletePosts($posts)
    {
        $con = $this->adapter->getDriver()->getConnection();

        try {

            $con->beginTransaction();

            $sql        = new Sql($this->adapter);

            $selected   = explode(', ', $posts);

            foreach($selected as $postId) {   
                $delete     = $sql->delete(['comment_post_id' => $postId])->from('comments');
                $statement  = $sql->prepareStatementForSqlObject($delete);
                $statement->execute();
                $this->delete(['post_id' => $postId]);                
            }

            $con->commit();

        } catch( \Exception $e ) {

            $con->rollback();
            throw $e;

        }       

    }


    /**
     * Simple posts search method using placeholders
     * 
     * @param  [string] $post_title 
     * @return [ResultSet Object]
     *
     *         Odlicno samo sto $post_title -> treba $postTitle...
     */
    public function search($postTitle)
    {
        //$select = $this->getSql()->select()->where(function($where) use ($post_title) {
        //	$query = '%' . $post_title . '%';
        //   $where->like('post_title', $query);
        //});

        $select = $this->getSql()->select();
        $select->where->like('post_title', "%$postTitle%");

        return $this->selectWith($select);
    }


}