<?php

namespace Application\Controller\Admin;

use Application\Controller\Admin\AdminPostController;
use Zend\ServiceManager\Factory\FactoryInterface;
use Interop\Container\ContainerInterface;
use Zend\Authentication\AuthenticationService;

class AdminPostControllerFactory implements FactoryInterface
{
    /**
     * [__invoke description]
     * @param  ContainerInterface $container [description]
     * @param  [type]             $reqName   [description]
     * @param  array|null         $options   [description]
     * @return [type]                        [description]
     */
    public function __invoke(ContainerInterface $container, $reqName, array $options = null)
    {

        return new AdminPostController(
        	$container->get(\Application\Service\AdminPostsService::class)
        );

    }

}