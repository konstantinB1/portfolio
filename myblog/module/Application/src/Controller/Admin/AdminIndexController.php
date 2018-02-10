<?php

namespace Application\Controller\Admin;

use Zend\Mvc\Controller\AbstractActionController;

class AdminIndexController extends AbstractActionController
{

    /**
     *  More in future :)
     */
    public function indexAction()
    {
        $this->redirect()->toRoute('admin/posts_management');
    }

}
