<?php

namespace Application\Filter;

use Zend\InputFilter\InputFilter;
use Zend\InputFilter\InputFilterAwareInterface;
use Zend\InputFilter\InputFilterInterface;

class AdminLoginFilter implements InputFilterAwareInterface
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
			'name'        => 'admin_email',
			'required'    => true,
			'filters'     => [['name' => 'StringTrim']],		
			'validators' => [
				[
					'name' => 'StringLength', 
					'options' => ['min' => 4, 'max' => 45 ],
				],		
				[
					'name'    => 'EmailAddress', 
				],			
			],
		]);

		$inputFilter->add([
			'name'          => 'admin_password',
			'required'      => true,
			'filters'       => [['name' => 'StringTrim']],			
			'validators'    => [	
				[
					'name' => 'StringLength', 
					'options' => ['min' => 6, 'max' => 15]
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