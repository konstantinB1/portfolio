<?php

namespace Application\Filter;

use Zend\InputFilter\InputFilter;
use Zend\InputFilter\InputFilterAwareInterface;
use Zend\InputFilter\InputFilterInterface;

class CommentsFilter implements InputFilterAwareInterface
{

    /**
    * @var $inputFilter
    */  
    protected $inputFilter;

    /**
    * getInputFilter
    * 
    * @return [InputFilter Object]
    */
    public function getInputFilter()
    {
        $inputFilter = new InputFilter();

        $inputFilter->add([
            'name'          => 'comment_name',
            'required'      => false,
            'filters'       => [['name' => 'StringTrim']],
            'validators'    => [
                [
                    'name'    => 'StringLength',
                    'options' => ['min' => 3, 'max' => 20],
                ],
                ['name' => 'Regex', 'options' => ['pattern' => '/[a-zA-Z0-9]/']],
            ],
        ]);

        $inputFilter->add([
            'name'          => 'comment_email',
            'required'      => false,
            'filters'       => [['name' => 'StringTrim']],
            'validators'    => [
                [
                    'name' => 'EmailAddress',
                ],
                [
                    'name'    => 'StringLength',
                    'options' => ['min' => 3, 'max' => 40]
                ],
            ],
        ]);

        $inputFilter->add([
            'name'          => 'comment_body',
            'required'      => true,
            'filters'       => [['name' => 'StringTrim']],
            'validators'    => [
                ['name' => 'StringLength', 'options' => ['min' => 3, 'max' => 255]],
            ],
        ]);

        return $inputFilter;
    }

    /**
    * setInputFilter
    * 
    * @param InputFilterInterface $inputFilter
    */
    public function setInputFilter(InputFilterInterface $inputFilter)
    {
        throw new \Exception('Not used');
    }

}