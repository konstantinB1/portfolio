<?php

namespace Application\Service;

use Application\Service\CommentsRestService;
use Interop\Container\ContainerInterface;
use Zend\ServiceManager\Factory\FactoryInterface;
use Zend\Authentication\AuthenticationService;

class CommentsRestServiceFactory 
{

    /**
     * [__invoke description]
     * @param  ContainerInterface $container [description]
     * @return [type]                        [description]
     *
     *         Ovo je sasvim validno ali ja mislim da je preglednije da gore imas:
     *         use \Application\Mapper\CommentsMapper;
     *
     *         pa onda dole:
     *         $container->get(CommentsMapper::class);
     *
     *         Ovo je samo moje misljenje...
     */	
	public function __invoke(ContainerInterface $container)
	{

		return new CommentsRestService(
            $container->get(\Application\Mapper\CommentsMapper::class),
            $container->get(\Application\Filter\CommentsFilter::class)
		);

	}
}