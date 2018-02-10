<?php

namespace Application\Entity;

class Posts
{

    /**
    * @var $post_id
    */  	
    private $post_id;

    /**
    * @var $post_title
    */  	    
    private $post_title;

    /**
    * @var $post_content
    */  	    
    private $post_content;

    /**
    * @var $post_created
    */  	    
    private $post_created; 

    /**
    * @var $post_desc
    */  	       
    private $post_desc;

    /**
    * @var $post_allow_comments
    */  	 
    private $post_allow_comments;  

     /**
    * @var $post_url_slug
    */  	   
    private $post_url_slug;

     /**
    * @var $post_writer
    */  	   
    private $post_writer;

     /**
    * @var $post_visible
    */  	   
    private $post_visible;


    /**
     * Exchange array for comments database entries
     * 
     * @param  array  $data
     */
	public function exchangeArray($data = [])
	{
        foreach (array_keys(get_object_vars($this)) as $property) {
            $this->{$property} = isset($data[$property]) ? $data[$property] : null;
        }    
	}

    /**
     * post_url_slug setter
     * @param  [string] $name
     * @return [string]
     */
	public function setUrlSlug($name)
	{
		$this->post_url_slug = $name;
	}	


    /**
     * By default it transforms post_title to valid slug
     *
     * post_url_slug getter
     * @return [slug] 
     */
	public function getUrlSlug()
	{
		return strtolower(preg_replace('/[^A-Za-z0-9-]+/', '-', $this->post_title));
	}


    /**
     * post_title getter
     * @return [string] $this->post_title
     */
	public function getTitle()
	{
		return $this->post_title;
	}


    /**
     * post_visible getter
     * @return [string] $this->post_visible
     */
	public function getVisible()
	{
		return $this->post_visible;
	}	


    /**
     * post_writer setter
     * @param  [string] $name
     * @return [string]
     */
	public function setWriter($name)
	{
		$this->post_writer = $name;
	}	


    /**
     * post_writer getter
     * @return [string] $this->post_writer
     */
	public function getWriter()
	{
		return $this->post_writer;
	}	


    /**
     * post_allow_comments getter
     * @return [string] $this->post_allow_comments
     */
	public function getAllowComments()
	{
		return $this->post_allow_comments;
	}


    /**
     * post_content getter
     * @return [string] $this->post_writer
     */
	public function getContent()
	{
		return $this->post_content;
	}	


    /**
     * post_id getter
     * @return [string] $this->post_id
     */
	public function getId()
	{
		return $this->post_id;
	}	


    /**
     * post_desc getter
     * @return [string] $this->post_desc
     */
	public function getDesc()
	{
		return $this->post_desc;
	}	


    /**
     * post_created getter
     * @return [string] $this->post_created
     */
	public function getCreated()
	{
		return $this->post_created;
	}	
    
    /**
     * Gets a copy of exchangeable data between table and 
     * probably post
     * 
     * @return [array]    
     */
	public function getArrayCopy()
	{
		return [
			'post_id'             => (int)    $this->getId(),
			'post_title'          => (string) $this->getTitle(),
			'post_desc '          => (string) $this->getDesc(),
			'post_content'        => (string) $this->getContent(),
			'post_created'        => (string) $this->getCreated(),
			'post_allow_comments' => (int)    $this->getAllowComments(),		
			'post_url_slug'       => (string) $this->getUrlSlug(),
			'post_writer'         => (string) $this->getWriter(),
			'post_visible'        => (int)    $this->getVisible() 			
		];
	}
}