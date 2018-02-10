<?php

namespace Application\Service;

use Application\Service\PagesService;
use Interop\Container\ContainerInterface;
use Zend\ServiceManager\Factory\FactoryInterface;
use Zend\Authentication\AuthenticationService;

class PagesServiceFactory 
{

    /**
     * [__invoke description]
     * @param  ContainerInterface $container [description]
     * @return [type]                        [description]
     */	
	public function __invoke(ContainerInterface $container)
	{

		return new PagesService(
        	$container->get(\Application\Mapper\PostsMapper::class) 
		);

	}
}