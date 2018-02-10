<?php

namespace Application;

use Zend\Router\Http\Literal;
use Zend\Router\Http\Segment;
use Zend\ServiceManager\Factory\InvokableFactory;

return [
    // Services!
    'service_manager' => [
        'factories' => [
            // DB Mappers and gateways
            Mapper\PostsMapper::class            => Mapper\PostsMapperFactory::class,
            Mapper\CommentsMapper::class         => Mapper\CommentsMapperFactory::class,
            Mapper\AdminMapper::class            => Mapper\AdminMapperFactory::class,

            // Filters
            Filter\CommentsFilter::class         => InvokableFactory::class,
            Filter\AdminPostAddFilter::class     => InvokableFactory::class,
            Filter\AdminLoginFilter::class       => InvokableFactory::class,

            // Services
            Service\AdminPostsService::class     => Service\AdminPostsServiceFactory::class,  
            Service\PagesService::class          => Service\PagesServiceFactory::class,       
            Service\CommentsRestService::class   => Service\CommentsRestServiceFactory::class,                         
            
        ],

        'invokables' => [
            Listeners\AdminAccessListener::class => \Application\Listeners\AdminAccessListener::class,
        ],
    ],

    'listeners'          => [
        Listeners\AdminAccessListener::class,
    ],

    // Controllers!
    'controllers'        => [
        'factories' => [

            // Public controllers
            Controller\Pub\PagesController::class           => Controller\Pub\PagesControllerFactory::class,
            Controller\Pub\CommentsController::class        => Controller\Pub\CommentsControllerFactory::class,

            // Admin Controllers
            Controller\Admin\AdminIndexController::class    => InvokableFactory::class,
            Controller\Admin\AdminPostController::class     => Controller\Admin\AdminPostControllerFactory::class,
            Controller\Admin\AdminLoginController::class    => Controller\Admin\AdminLoginControllerFactory::class,    
        ],
    ],

    // Routes
    'router'             => [
        'routes' => [
            'home' => [
                'type'    => Segment::class,
                'options' => [
                    'route'    => '/[:action][/:post_title]',
                    'defaults' => [
                        'controller' => Controller\Pub\PagesController::class ,
                        'action'     => 'index',
                    ],
                ],

            ],

            'admin' => [
                'type'          => Literal::class,
                'options'       => [
                    'route'    => '/admin',
                    'defaults' => [
                        'controller' => Controller\Admin\AdminIndexController::class,
                        'action'     => 'index',
                    ],
                ],
                'may_terminate' => true,
                'child_routes'  => [

                    'login_management' => [
                        'type'        => Segment::class,
                        'options'     => [
                            'route'    => '/login[/:action]',
                            'action'   => 'index',
                            'defaults' => [
                                'controller' =>  Controller\Admin\AdminLoginController::class,
                                'action '    => 'index',
                            ],
                        ],
                        'constraints' => [
                            'action' => '[a-zA-Z]',
                        ],
                    ],

                    'posts_management' => [
                        'type'        => Segment::class,
                        'options'     => [
                            'route'    => '/posts[/:action[/:id]]',
                            'action'   => 'index',
                            'defaults' => [
                                'controller' => Controller\Admin\AdminPostController::class,
                                'action '    => 'index',
                            ],
                        ],
                        'constraints' => [
                            'action' => '[^a-zA-Z]+$',
                            'id'     => '[^0-9]',
                        ],
                    ],
                ],
            ],

            'comments' => [
                'type'        => Segment::class,
                'options'     => [
                    'route'    => '/comments[/:action[/:post_id]]',
                    'defaults' => [
                        'controller' =>  Controller\Pub\CommentsController::class,
                        'action'     => 'show',
                    ],
                ],
                'constraints' => [
                    'action' => '[^a-zA-Z]+$',
                ],
            ],

            'posts' => [
                'type'        => Segment::class,
                'options'     => [
                    'route'    => '/posts[/:action]',
                    'defaults' => [
                        'controller' => 'PostsRestController',
                        'action'     => 'index',
                    ],
                ],
                'constraints' => [
                    'action' => '[^a-zA-Z]+$',
                ],
            ],

        ],
    ],

    // Config za view
    'view_manager'       => [
        'strategies'               => ['ViewJsonStrategy'],
        'display_not_found_reason' => true,
        'display_exceptions'       => true,
        'doctype'                  => 'HTML5',
        'not_found_template'       => 'error/404',
        'exception_template'       => 'error/index',
        'template_map'             => [
            'application/index/index' => __DIR__ . '/../view/application/index/index.phtml',
            'layout/layout'           => __DIR__ . '/../view/layout/layout.phtml',
            'error/404'               => __DIR__ . '/../view/error/404.phtml',
            'error/index'             => __DIR__ . '/../view/error/index.phtml',
        ],
        'template_path_stack'      => [
            __DIR__ . '/../view',
        ],
    ],
];
