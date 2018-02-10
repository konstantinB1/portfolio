<?php

namespace Application\Controller\Admin;

use Application\Service\AdminPostsService;
use Zend\Authentication\AuthenticationService;
use Zend\Mvc\Controller\AbstractActionController;
use Zend\Mvc\MvcEvent;
use Zend\Session\Container;
use Zend\View\Model\JsonModel;

class AdminPostController extends AbstractActionController
{
    /**
     * @var $posts
     */
    private $service;

    /**
     * Posts constructor
     *
     * @param PostsMapper           $posts       [description]
     * @param AdminPostAddFilter    $filter      [description]
     * @param AuthenticationService $authService [description]
     */
    public function __construct(AdminPostsService $service)
    {
        $this->service  = $service;
    }

    /**
     * Nothing here just route
     */
    public function indexAction()
    {
    }

    /**
     * XHLHttpRequest only fetching individual post by id
     *
     * @return [json]
     */
    public function requestPostAction()
    {
        if (!$this->getRequest()->isXmlHttpRequest()) {
            $this->redirect()->toRoute('admin');
        }

        $getPost = $this->service->requestPost($this->params()->fromRoute('id'));
        return new JsonModel($getPost);
    }

    /**
     * XHLHttpRequest only changing post_visible value
     *
     * @return [json|null]
     */
    public function toggleVisibleAction()
    {
        if ($this->getRequest()->isXmlHttpRequest()) {

            $id      = $this->params()->fromRoute('id');
            $visible = $this->params()->fromQuery('post_visible');
            
            $update  = $this->service->updateField(['post_visible' => $visible], $id);

            if ($update) {
                return new JsonModel(['visible' => $visible]);
            }
        }
    }

    /**
     * XHLHttpRequest only deletes selected posts
     *
     * @return [json|null]
     */
    public function deleteSelectedAction()
    {
        if (!$this->getRequest()->isXmlHttpRequest()) {
            $this->getResponse()->setStatusCode(404);
        }

        if ($this->service->deletePosts($this->getRequest()->getPost('delete_posts'))) {
            return new JsonModel(['success' => true]);
        }
    }

    /**
     * XHLHttpRequest only returns all posts, and post count
     *
     * @return [json]
     */
    public function fetchAllAction()
    {
        $posts = $this->service->fetchAll();
        return new JsonModel($posts);
    }


    /**
     * For adding new and changing existing posts data
     *
     * @return [json]
     */
    public function processAction()
    {
        $post     = $this->getRequest()->getPost();
        $id       = $this->params()->fromRoute('id') ? $this->params()->fromRoute('id') : 0;
        $action   = $this->service->postManagement($post, $id);

        if (is_array($action) && $action[0] == 'error') {
            return new JsonModel([$action[1], 'error' => true]);
        }

        return new JsonModel(['success']);
    }
}