<?php

use Zend\Session\Storage\SessionArrayStorage;
use Zend\Session\Validator\RemoteAddr;
use Zend\Session\Validator\HttpUserAgent;

return [
    'db'                 => [
        'driver' => 'Pdo',
        'dsn'    => 'mysql:dbname=blog;host=localhost;charset=utf8',
    ],

    // session
    'session_config'     => [
        'cookie_lifetime' => 60 * 60 * 1,
        'gc_maxlifetime'  => 60 * 60 * 24 * 30
    ],
    'session_manager'    => [
        'validators' => [
            RemoteAddr::class,
            HttpUserAgent::class,
        ]
    ],
    'session_storage'    => [
        'type' => SessionArrayStorage::class
    ],
    'session_containers' => [
        'ContainerNamespace'
    ],

    'service_manager' => [
        'invokables' => [
            Zend\Authentication\AuthenticationService::class => Zend\Authentication\AuthenticationService::class,
        ],
        'factories' => [
           'Zend\Session\Config\ConfigInterface'         => 'Zend\Session\Service\SessionConfigFactory',
        ],
    ],

];
