<?php

namespace Application\Controller\Pub;

use Application\Service\PagesService;
use Application\Filter\ContactFilter;
use Zend\Mvc\Controller\AbstractRestfulController;
use Zend\View\Model\JsonModel;
use Zend\View\Model\ViewModel;
use Zend\Mail;

class PagesController extends AbstractRestfulController
{
    /**
     * @var $posts
     */
    private $service;

    /**
     * Pages constructor
     *
     * @param PostsMapper $posts
     */
    public function __construct(PagesService $service)
    {
        $this->service = $service;
    }

    /**
     * blank route
     */
    public function indexAction()
    {
    }

    /**
     * blank route
     */
    public function aboutAction()
    {
    }

    /**
     * blank route
     */
    public function contactAction()
    {
    }

    /**
     * Checks for contact for validation then sends mail to the admin LOL
     * @return [json]
     */
    public function contactProcessAction()
    {
        if (!$this->getRequest()->isPost() || !$this->getRequest()->isXmlHttpRequest()) {
            $this->getResponse()->setStatusCode(404);
        }

        $contactCheck = $this->service->contactForm($this->params()->fromPost());

        if (is_array($contactCheck) && $contactCheck[0] == 'error') {
            return new JsonModel([$contactCheck[1], 'error' => true]);
        }

        // $mail = new Mail\Message();

        // $mail->setBody($post['contact_body']);
        // $mail->setFrom($post['contact_email'], $post['contact_name']);
        // $mail->addTo('konstantinbulatovic1@gmail.com', 'Konstantin');        
        // $mail->setSubject($post['contact_subject']);

        // $transport = new Mail\Transport\Sendmail('konstantinbulatovic1@gmail.com');
        // $transport->send($mail);

        return new JsonModel(['success']);

    }

    /**
     * Fetches all posts
     *
     * @return [json]
     */
    public function fetchAllAction()
    {
        return new JsonModel($this->service->fetchAll());
    }

    /**
     * Search users posts
     *
     * @return [json]
     */
    public function searchAction()
    {
        $req = $this->getRequest();

        if (!$req->isPost()) {
            $this->getResponse()->setStatusCode(404);
        }

        return new JsonModel($this->service->searchPost($req->getPost('post_title')));
    }


    /**
     * Fetches post by post_id
     *
     * @return [json]
     */
    public function fetchPostAction()
    {
        if (!$this->getRequest()->isXmlHttpRequest()) {
            $this->getResponse()->setStatusCode(404);
            return;
        }        
        return new JsonModel($this->service->fetchByTitle($this->params()->fromRoute('post_title')));
    }

    /**
     * Checks if post title is equal to provided GET url slug param
     *
     * @return [HttpResponse|null]
     */
    public function pAction()
    {
        if (!$this->service->postTitleExists($this->params()->fromRoute('post_title'))) {
            $this->getResponse()->setStatusCode(404);
        }
    }
}