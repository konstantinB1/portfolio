<?php

namespace Application\Controller\Pub;



use Application\Service\CommentsRestService;
use Zend\Mvc\Controller\AbstractActionController;
use Zend\View\Model\JsonModel;

class CommentsRestController extends AbstractActionController
{
    /**
     * @var $filter
     */
    public $service;

    /**
     * Comments Constructor
     *
     * @param CommentsMapper $comments
     * @param CommentsFilter $filter
     */
    public function __construct(CommentsRestService $service)
    {
        $this->service = $service;
    }

    /**
     * Validates post data then inserts new comments field
     *
     * @return [json]
     */
    public function newCommentAction()
    {
        if (!$this->getRequest()->isPost() || !$this->getRequest()->isXmlHttpRequest()) {
            $this->getRequest()->setStatusCode(404);
        }

        $fetch  = $this->service->addThenFetch(
            $this->getRequest()->getPost(), 
            $this->params()->fromRoute('post_id')
        );

        if (is_array($fetch) && $fetch[0] == 'error') {
            return new JsonModel([$fetch[1], 'error' => true]);
        }

        return new JsonModel($fetch);
    }

    /**
     * Fetches all comments that match provided post_id
     *
     * @return [json]
     */
    public function listCommentsAction()
    {
        return new JsonModel($this->service->allComments($this->params()->fromRoute('post_id')));
    }
}