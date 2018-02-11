<?php

namespace Application\Service;

use Application\Mapper\PostsMapper;
use Application\Filter\AdminPostAddFilter;
use Application\Entity\Posts;
use Zend\Authentication\AuthenticationService;

class AdminPostsService 
{

	/**
	 * @var $mapper;
	 */
	public $mapper;

	/**
	 * @var $filter;
	 */	
	public $filter;

	/**
	 * @var $authService;
	 */
	public $authService;

    /**
     * Posts Service Constructor
     * 
     * @param PostsMapper           $mapper      [description]
     * @param AdminPostAddFilter    $filter      [description]
     * @param AuthenticationService $authService [description]
     */
	public function __construct(
	   PostsMapper $mapper, 
	   AdminPostAddFilter $filter,
	   AuthenticationService $authService
	)
	{
		$this->mapper      = $mapper;
		$this->filter      = $filter;
		$this->authService = $authService;

	}

    
    /**
     * Returns admin auth id, in this case email
     * 
     * @return [sting] [description]
     */
	private function identity()
	{
		return $this->authService->getIdentity()->admin_email;
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
     * Fetch last post in database
     * 
     * @return [type] [description]
     */
	public function fetchLast()
	{
		return $this->mapper->fetchLast();		
	}

    /**
     * Delete post and comment where post id
     * 
     * @param  [type] $postId [description]
     * @return [type]         [description]
     */
    public function deletePosts($posts)
    {
	    $this->mapper->deletePosts($posts);
        return true;
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
        return $this->mapper->update($data, ['post_id' => $postId]);
        return true;
    }

    /**
     * Add new post
     * 
     * @param  [array] $posts             [description]
     * @return [ResultSet Object]         [description]
     *
     *         Pogledaj comment na entityExchange() funkciji prvo.
     *         Ovo je super stvar ovde, dakle u ovakvim situcijama metodu koja zelis da ti vrati clean podatke za
     *         storage treba da stavis u Entity sam jer je to deo njegove prirode.
     *
     *         Takodje mozes ovde pozivati tipa
     *         $this->mapper->insert($posts->getStorageArray());
     *         Ali mozes i proslediti ceo post u maper pa tamo raditi $post->getStorageArray();
     *         ako hoces cimni me uzivo da prodiskutujemo...
     *
     *
     *         [EDIT] Aaaa tek sam sad video ti pozivas metode insert() i update() direkt iz mapera,
     *         mozes tako ali ne bi bilo lose da imas odvojene metode u tvom custom maperu tipa:
     *              savePost(\Application\Entity\Post $post)
     *
     *         pa u njemu:
     *         if($post->getId()) { // znaci ako postoji ID moramo raditi update
     *                  $this->>update($post->getStorageData());
     *         }
     *         else{
     *                  $this->>insert($post->getStorageData());
     *         }
     *
     *         I na kraju ovo fetchLast(); je cool ali nema potrebe, mozes samo vratiti $post jer je isti rezultat!
     */
    public function newPost($post)
    {

        $data = [
            'post_title'          => (string) $post->getTitle(),
            'post_desc'           => (string) $post->getDesc(),
            'post_content'        => (string) $post->getContent(),
            'post_created'        => (string) $post->getCreated(),
            'post_allow_comments' => (int)    $post->getAllowComments(),        
            'post_url_slug'       => (string) $post->getUrlSlug(),
            'post_writer'         => (string) $this->identity(),
            'post_visible'        => (int)    $post->getVisible()               
        ];     

        unset($data['post_created']);            

        $this->mapper->insert($data); 
    }

    /**
     * Edit existing post
     * 
     * @param  [array] $posts             [description]
     * @param  [int] $postId              [description]
     * @return [ResultSet Object]         [description]
     */
    public function editPost($post, $postId)
    {

        $data = [
            'post_title'          => (string) $post->getTitle(),
            'post_desc'           => (string) $post->getDesc(),
            'post_content'        => (string) $post->getContent(),
            'post_created'        => (string) $post->getCreated(),
            'post_allow_comments' => (int)    $post->getAllowComments(),        
            'post_url_slug'       => (string) $post->getUrlSlug(),
            'post_writer'         => (string) $this->identity(),
            'post_visible'        => (int)    $post->getVisible()               
        ]; 

        unset($data['post_created']);  

        $this->mapper->update($data, ['post_id' => $postId]); 
        return $this->mapper->fetchLast();
    }

    /**
     * Edit or add post
     * 
     * @param  [object]  $post   [description]
     * @param  [int]     $postId [description]
     * @return [object]          [description]
     */
    public function postManagement($post, $postId = 0) 
    {        

    	$filter    = $this->filter->getInputFilter()->setData($post);
    	$identity  = $this->identity();

        if (!$filter->isValid()) {
            return ['error', $filter->getMessages()];
        }
        
        $entity = new Posts();
        $entity->exchangeArray($post);

	    if ($postId !== 0) {
	    	return $this->editPost($entity, $postId);
	    }

	    $this->newPost($entity);
        return true;

    }
    /**
     * Get post by id
     * 
     * @param  [int]              $id [description]
     * @return [ResultSet Object]     [description]
     */
    public function requestPost($id)
    {
    	$where = ['post_id' => $id];
		if ($this->mapper->entryExists($where)) {
			return $this->mapper->fetchWhere($where);
		}
    }

}