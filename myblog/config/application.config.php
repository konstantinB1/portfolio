<?php

return [
    // registrovanje modula!
    'modules'                 => [
        'Zend\Session',
        'Zend\Mvc\Plugin\Prg',
        'Zend\Mvc\Plugin\Identity',
        'Zend\Mvc\Plugin\FlashMessenger',
        'Zend\Mvc\I18n',
        'Zend\Log',
        'Zend\Db',
        'Zend\Cache',
        'Zend\Router',
        'Zend\Validator',

        'Application',
    ],

    // njegovo ne diraj :)
    'module_listener_options' => [
        'module_paths'             => [
            './module',
            './vendor',
        ],
        'config_glob_paths'        => [
            realpath(__DIR__) . '/autoload/{{,*.}global,{,*.}local}.php',
        ],

        // Caching - on dev mora biti OFF
        'config_cache_enabled'     => false,
        'config_cache_key'         => 'application.config.cache',
        'module_map_cache_enabled' => false,
        'module_map_cache_key'     => 'application.module.cache',
        'cache_dir'                => 'data/cache/',
    ],
];
