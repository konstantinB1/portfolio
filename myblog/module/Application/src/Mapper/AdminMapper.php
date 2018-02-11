<?php

namespace Application\Mapper;

use Application\Entity\Admin;
use Zend\Db\Adapter\Adapter;
use Zend\Db\Adapter\AdapterAwareInterface;
use Zend\Db\ResultSet\HydratingResultSet;
use Zend\Db\TableGateway\AbstractTableGateway;

class AdminMapper extends AbstractTableGateway
{

	protected $table = 'admins';


    /**
     * Admin database 
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
     * Select all entries
     * 
     * @return array 
     */
	public function fetchAll()
	{
		$select = $this->select();
		return $select->toArray();
	}


    /**
     * Selects by where clause
     * 
     * @param  array  $where
     * @return array
     */
	public function fetchBy(array $where)
	{
		$select = $this->getSql()->select()->where($where);
		return $this->selectWith($select)->toArray();
	}

    
    /**
     * Links post data to admin entities array. Uses init parameter 
     * for initial row creating if table is empty
     * 
     * @param Admin  $admin 
     * @param [bool] $init 
     * return [bool]
     */
	public function add(Admin $admin, $init = null)
	{

		$data = [];

		if ($init) { 
			$admin->setPassword('123456');	
			$admin->setEmail('admin@myblog.com');
		}

		$data['admin_email']    = (string) $admin->getEmail();
		$data['admin_password'] = (string) $admin->getPassword();		

        if ($this->insert($data)) {
        	return true;
        }

        return false;

	}

}