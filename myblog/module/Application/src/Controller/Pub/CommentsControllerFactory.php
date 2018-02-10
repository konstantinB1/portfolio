<?php

namespace Application\Controller\Pub;

use Application\Controller\Pub\CommentsRestController;
use Application\Service\CommentsRestService;
use Zend\ServiceManager\Factory\FactoryInterface;
use Interop\Container\ContainerInterface;

class CommentsControllerFactory implements FactoryInterface
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
        return new CommentsRestController(
            $container->get(CommentsRestService::class)
        );
    }
}