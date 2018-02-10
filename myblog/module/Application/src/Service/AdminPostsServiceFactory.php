<?php

namespace Application\Service;

use Application\Service\AdminPostsService;
use Interop\Container\ContainerInterface;
use Zend\ServiceManager\Factory\FactoryInterface;
use Zend\Authentication\AuthenticationService;

class AdminPostsServiceFactory 
{

    /**
     * [__invoke description]
     * @param  ContainerInterface $container [description]
     * @return [type]                        [description]
     */	
	public function __invoke(ContainerInterface $container)
	{

		return new AdminPostsService(
        	$container->get(\Application\Mapper\PostsMapper::class), 
        	$container->get(\Application\Filter\AdminPostAddFilter::class),
        	$container->get(AuthenticationService::class)

		);

	}
}