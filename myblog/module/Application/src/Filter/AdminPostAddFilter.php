<?php

namespace Application\Filter;

use Zend\InputFilter\InputFilter;
use Zend\InputFilter\InputFilterAwareInterface;
use Zend\InputFilter\InputFilterInterface;

class AdminPostAddFilter implements InputFilterAwareInterface
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
			'name'        => 'post_title',
			'required'    => true,
			'filters'     => [['name' => 'StringTrim']],		
			'validators' => [
				[
					'name' => 'StringLength', 
					'options' => ['min' => 5, 'max' => 35,],
				],			
				// [
				// 	'name'    => 'Regex',
				// 	'options' => [ 'pattern' => '/^[a-zA-Z0-9,.!?]*$/' ],
				// ],		
			],
		]);

		$inputFilter->add([
			'name'          => 'post_desc',
			'required'      => true,
			'filters'       => [['name' => 'StringTrim']],			
			'validators'    => [	
				[
					'name' => 'StringLength', 
					'options' => ['min' => 10, 'max' => 550]
				],		
			],
		]);		

		$inputFilter->add([
			'name'        => 'post_content',
			'required'    => true,
			'filters'     => [['name' => 'StringTrim']],				
			'validators' => [
				['name' => 'StringLength', 'options' => ['min' => 20, 'max' => 5500]],
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