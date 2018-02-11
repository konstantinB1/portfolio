<?php

namespace Application\Controller\Admin;

use Application\Filter\AdminLoginFilter;
use Application\Mapper\PostsMapper;
use Zend\Mvc\Controller\AbstractActionController;
use Zend\View\Model\JsonModel;
use Zend\Authentication\AuthenticationService;


class AdminLoginController extends AbstractActionController
{

    /**
    * @var $authService
    */      
    private $authService;

    /**
    * @var $filter
    */          
    private $filter;

    /**
    * @var $filter
    */          
    private $mapper;    

    /**
     * Uses Zend Athentication Service class, which checks user POST login information,
     * and compares them to the information provided in this factory constructor.
     *
     * @param AuthenticationService $authService
     * @param AdminLoginFilter      $filter
     */
    public function __construct(
        AuthenticationService $authService,
        AdminLoginFilter $filter,
        PostsMapper $mapper
    ) {
        $this->authService    = $authService;
        $this->filter         = $filter;
        $this->mapper         = $mapper;
    }


    /**
     * Zend filter validates POST data, if identity exists returns Zend DB current hydrating 
     * result object
     *
     * @return JsonModel
     */
    public function indexAction()
    {
        if ($this->authService->hasIdentity()) {
            $this->redirect()->toRoute('admin');
        }

        if ($this->getRequest()->isPost()) {
            $post   = $this->getRequest()->getPost();
            $filter = $this->filter->getInputFilter()->setData($post);

            if (!$filter->isValid()) {
                return new JsonModel([$filter->getMessages(), 'error' => true]);
            }

            $email    = $this->params()->fromPost('admin_email');
            $password = $this->params()->fromPost('admin_password');
            $adapter  = $this->authService->getAdapter();
            $adapter->setIdentity($email);
            $adapter->setCredential($password);
            $result = $this->authService->authenticate();

            if (!$result->isValid()) {
                return new JsonModel($result->getMessages());
            }

            $user = $adapter->getResultRowObject();
            $this->authService->getStorage()->write($user);

            return new JsonModel([]);
        }
    }


    /**
     * Clears AthenticationService generated identity, then redirects
     * user to login page
     *
     * @return [redirect]
     */
    public function logoutAction()
    {
        $this->authService->clearIdentity();
        return $this->redirect()->toRoute('admin/login_management');
    }

}