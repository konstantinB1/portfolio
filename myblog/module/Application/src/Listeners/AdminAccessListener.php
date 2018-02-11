<?php

namespace Application\Listeners;

use Zend\Authentication\AuthenticationService;
use Zend\Authentication\Adapter\DbTable\CallbackCheckAdapter;
use Zend\Db\Adapter\Adapter;
use Zend\Crypt\Password\Bcrypt;
use Zend\EventManager\AbstractListenerAggregate;
use Zend\EventManager\EventManagerInterface;
use Zend\Mvc\MvcEvent;
use Zend\Session\SessionManager;
use Zend\Session\Container;

class AdminAccessListener extends AbstractListenerAggregate
{

    /**
     * Zend dispatch event
     * 
     * @param  EventManagerInterface $events   
     * @param  integer               $priority                      
     */
    public function attach(EventManagerInterface $events, $priority = 1)
    {
        $events->getSharedManager()->attach(
            'Zend\Mvc\Controller\AbstractController', 
            'dispatch', 
            [$this, 'identity'], 
            100
        );
    }

    
    /**
     * Checks for user's current route through controllers and actions. 
     * Disable and enable certain privilegess depending on the controller
     * 
     * @param  MvcEvent $e [description]
     */
    public function identity(MvcEvent $e)
    {

        $current              = $e->getTarget();
        $controller           = $e->getRouteMatch()->getParam('controller', null);
        $action               = $e->getRouteMatch()->getParam('action', null);        
        $serviceManager       = $e->getApplication()->getServiceManager();

        $adminMapper          = $serviceManager->get(\Application\Mapper\AdminMapper::class); 
        $auth                 = $serviceManager->get(AuthenticationService::class);  

        $config               = $serviceManager->get('config');
      
        $adminRoute           = $config['router']['routes']['admin'];
        $adminRouteController = $adminRoute['options']['defaults']['controller'];
        $childRoutes          = $adminRoute['child_routes'];


        foreach($childRoutes as $child) {

            $childController      = $child['options']['defaults']['controller'];
            $loginController      = 'Application\Controller\Admin\AdminLoginController';

            if (!$auth->hasIdentity()) {

                if (
                    $controller == $childController       && 
                    $controller != $loginController       ||
                    $controller == $adminRouteController 
                ) {

                    $current->redirect()->toRoute('admin/login_management');    
                }
            } 
        }

        // For navigations
        if ($auth->hasIdentity()) {

            $adminMode = true;
            $current->layout()->setVariables([
                'adminName'   => $auth->getIdentity(),
                'adminMode'   => $adminMode,
            ]);   
        }
    }
}