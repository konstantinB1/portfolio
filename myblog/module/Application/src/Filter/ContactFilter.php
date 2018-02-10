<?php

namespace Application\Filter;

use Zend\InputFilter\InputFilter;
use Zend\InputFilter\InputFilterAwareInterface;
use Zend\InputFilter\InputFilterInterface;

class ContactFilter implements InputFilterAwareInterface
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
            'name'          => 'contact_name',
            'required'      => true,
            'filters'       => [['name' => 'StringTrim']],
            'validators'    => [
                [
                    'name'    => 'StringLength',
                    'options' => ['min' => 3, 'max' => 30],
                ],
            ],
        ]);

        $inputFilter->add([
            'name'          => 'contact_email',
            'required'      => true,
            'filters'       => [['name' => 'StringTrim']],
            'validators'    => [
                [
                    'name' => 'EmailAddress',
                ],
                [
                    'name'    => 'StringLength',
                    'options' => ['min' => 5, 'max' => 40]
                ],
            ],
        ]);

         $inputFilter->add([
            'name'          => 'contact_body',
            'required'      => true,
            'filters'       => [['name' => 'StringTrim']],
            'validators'    => [
                [
                    'name'    => 'StringLength',
                    'options' => ['min' => 20, 'max' => 7500]
                ],
            ],
        ]);    

        $inputFilter->add([
            'name'          => 'contact_subject',
            'required'      => true,
            'filters'       => [['name' => 'StringTrim']],
            'validators'    => [
                [
                    'name'    => 'StringLength',
                    'options' => ['min' => 20, 'max' => 200]
                ],
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