<?php

namespace Application\Mapper;

use Interop\Container\ContainerInterface;
use Zend\Db\Adapter\Adapter;
use Zend\Db\ResultSet\HydratingResultSet;
use Zend\Hydrator\ArraySerializable;

use Application\Entity\Posts;

class PostsMapperFactory 
{

    /**
     * [__invoke description]
     * @param  ContainerInterface $container [description]
     * @return [type]                        [description]
     */	
	public function __invoke(ContainerInterface $container)
	{

		return new PostsMapper(
			$container->get(Adapter::class), 
			new HydratingResultSet(new ArraySerializable(), new Posts())
		);

	}
}