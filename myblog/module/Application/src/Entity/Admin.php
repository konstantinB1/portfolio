<?php

namespace Application\Entity;

use Zend\Crypt\Password\Bcrypt;

class Admin
{

    /**
    * @var $admin_id
    */    
    private $admin_id;

    /**
    * @var $admin_email
    */    
    private $admin_email;   

    /**
    * @var $admin_password
    */         
    private $admin_password;

    /**
     * Exchange array for admin database entries
     * 
     * @param  array  $data
     */
    public function exchangeArray(array $data = [])
    {
        foreach (array_keys(get_object_vars($this)) as $property) {
            $this->{$property} = isset($data[$property]) ? $data[$property] : null;

        }
    }


    /**
     * Hashing password by default PHP algo, then verifies it
     * with Zend Crypt
     * 
     * @param  [string] $password 
     * @return [string] $hash
     */
    private function hashPassword($password)
    {
        $crypt = new Bcrypt();
        $hash  = password_hash($password, PASSWORD_DEFAULT);

        if ($crypt->verify($password, $hash)) {
            return $hash;
        }
    }


    /**
     * admin_id getter
     * @return [int] $this->admin_id
     */
    public function getId()
    {
        return $this->admin_id;
    }


    /**
     * admin_email getter
     * @return [string] $this->admin_email
     */
    public function getEmail()
    {
        return $this->admin_email;
    }


    /**
     * admin_email setter
     * 
     * @param  [string] $email
     * @return [int]    $this->admin_id
     */
    public function setEmail($email)
    {
        $this->admin_email = $email;
    }


    /**
     * admin_password getter
     * @return [string] $this->admin_password
     */
    public function getPassword()
    {
        return $this->admin_password;
    }


    /**
     * admin_password setter
     * 
     * @param  [string] $passowrd
     * @return [hash]    
     */
    public function setPassword($password)
    {
        $this->admin_password = $this->hashPassword($password);
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
            'admin_id'                            => (int)$this->getId(),
            'admin_email'                         => (string)$this->getEmail(),
            'admin_password'                      => (string)$this->getPassword()
        ];
    }
}