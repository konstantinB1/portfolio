(function($, win, doc) {
'use strict';

let updateTimer = 50;

function isValidRange() {
	return ($.isNumeric(this.options.minc) && $.isNumeric(this.options.maxc)) &&
	       (this.options.minc !== 0 && this.options.maxc !== 0)
}

function Input(el, options) {

    this.el            = $(el)
	this.val           = $(el).val();
	this.type          = $(el).attr('type')
    this.helper        = $selector.closest('.input-info') || $selector.siblings().last();

	this.isTriggered   = false;
	this.options       = $.extend({}, Inputs.Defaults, options);

}

Input.Defaults = {
	required: false,
	maxc:10,
	minc:4,
	regexp: /reg/
}


Input.prototype.chRemaining = function() {

	let remain = this.options.maxc;

    if(this.isTriggered && isValidRange()) {
    	if(this.val > 0) {
    		remain--;
		    this.helper.html(remain + ' characters remaining');
    	}
    } 
}

Input.prototype.check = function() {
    let $this = $(this)[0];

    if(!$this.hidden && this.isInput($this)) {
	    if($this.localName === 'input') {
            
	    }
    }
}

Input.prototype.isValid = function(element) {
	e = $(element);
	return e.is('input') || e.is('checkbox') || e.is('form');
}

Input.prototype.regulateField = function(field) {
    let that = this;
}

function Plugin(element, option) {
	return this.each(function() {
       let $this = $(this);
       let data = $that.data('input.info');
       let options = typeof option == 'object' && option;

       if(!data) $this.data('input.info', (data = new Input(this, options)));

       setTimeout($this.keypress(Inputs.prototype.check), updateTimer);
	})
}

$.fn.inputs = Plugin

})(jQuery, window, document);
