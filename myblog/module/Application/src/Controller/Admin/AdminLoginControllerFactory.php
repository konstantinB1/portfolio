<?php

namespace Application\Controller\Admin;

use Application\Controller\Admin\AdminLoginController;
use Application\Filter\AdminLoginFilter;
use Interop\Container\ContainerInterface;
use Zend\Authentication\Adapter\DbTable\CallbackCheckAdapter;
use Zend\Authentication\AuthenticationService;
use Zend\Crypt\Password\Bcrypt;
use Zend\Db\Adapter\Adapter;
use Zend\ServiceManager\Factory\FactoryInterface;

class AdminLoginControllerFactory implements FactoryInterface
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
        $authService = $container->get(AuthenticationService::class);
        $zendDb      = $container->get(Adapter::class);
        $authAdapter = new CallbackCheckAdapter(
            $zendDb,
            'admins',
            'admin_email',
            'admin_password',
            self::class . "::checkPass"
        );

        $authService->setAdapter($authAdapter);

        return new AdminLoginController(
            $authService,
            $container->get(AdminLoginFilter::class)
        );
    }


    /**
     * For CallbackCheckAdapter comparing hash
     * 
     * @param  [type] $hash     [description]
     * @param  [type] $password [description]
     * @return [type]           [description]
     */
    public static function checkPass($hash, $password)
    {
        $bcrypt = new Bcrypt();
        return $bcrypt->verify($password, $hash);
    }

}