<?php

namespace Application\Controller\Pub;

use Zend\ServiceManager\Factory\FactoryInterface;
use Interop\Container\ContainerInterface;

class PagesControllerFactory implements FactoryInterface
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
        return new PagesController($container->get(\Application\Service\PagesService::class));
    }
}