<?php

namespace Application\Entity;

class Comments
{

    /**
    * @var $comment_id
    */    	
    private $comment_id;

    /**
    * @var $comment_post_id
    */       
    private $comment_post_id;

    /**
    * @var $comment_email
    */           
    private $comment_email;

    /**
    * @var $comment_name
    */           
    private $comment_name;

    /**
    * @var $comment_body
    */         
    private $comment_body;

    /**
    * @var $comment_created
    */         
    private $comment_created;


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
     * comment_id getter
     * @return [int] $this->comment_id
     */
	public function getId()
	{
		return $this->comment_id;
	}


    /**
     * comment_post_id getter
     * @return [int] $this->comment_post_id
     */
	public function getPostId()
	{
		return $this->comment_post_id;
	}	


    /**
     * comment_email getter
     * @return [int] $this->comment_email
     */
	public function getEmail()
	{
		return $this->comment_email;
	}	


    /**
     * comment_name getter
     * @return [int] $this->comment_name
     */
	public function getName()
	{
		return $this->comment_name;
	}	


    /**
     * comment_body getter
     * @return [int] $this->comment_body
     */
	public function getBody()
	{
		return $this->comment_body;
	}	


    /**
     * comment_created getter
     * @return [int] $this->get_created
     */
	public function getCreated()
	{
		return $this->comment_created;
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
			'comment_id'          => (int)    $this->getId(),
			'comment_post_id'     => (int)    $this->getPostId(),
			'comment_name'        => (string) $this->getName(),
			'comment_email'       => (string) $this->getEmail(),
			'comment_body'        => (string) $this->getBody(),
			'comment_created'     => (string) $this->getCreated(),

		];
	}
}