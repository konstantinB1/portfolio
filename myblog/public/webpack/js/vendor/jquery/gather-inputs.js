(function($) {

   window.AjaxInputPost = function(url, callback, options) {

	   if (typeof url !== 'string') {
		   console.error('First argument must be a valid url string')
	   }		   

	   if (typeof callback !== 'function') {
		   console.error('Second parrameter must be a valid callback function')
	   }	   

	   this.settings = {
		   postData: {},
		   gatherInputsMannualy: false,
           userOptions: {}
	   }

       this.url = url
       this.callback = callback

	   this.settings.userOptions = {
		   ajaxDefaultType: {
		       type: 'POST',
		       dataType: 'json',			   
		   },
           inputTypes: 'input, select, checkbox, textarea',
           gatherInputsFormIdentifier: '[data-ajax="true"]', 
           states: {}               
	   }


	   this.options = $.extend({}, this.settings.userOptions, options)

	   this._gatherInputs(null)
	   this._ajaxConnect()
   }

   var AjaxInputPostPrototype = window.AjaxInputPost.prototype


   AjaxInputPostPrototype._checkValidInputTypes = function(jQuerySelectorString) {
   	   if (typeof jQuerySelectorString !== 'string') {
	       console.error('Parameter must be a string matching jQuery selector array')
   	   }
   	   var allowedTypes = ['input', 'select', 'checkbox', 'textarea']
   	   var self = this
	   var check = jQuerySelectorString.split(', ')
	   var allowedTypesLen = allowedTypes.length
	   var checkTypeLen = check.length
	   var validFilter = []
	   for (var i = 0; i < checkTypeLen; i++) {
	       for (var j = 0; j < allowedTypesLen; j++) {
	       	   var itemToCheck = check[i]
	       	   var allowedItem = allowedTypes[j]
	           if (itemToCheck === allowedItem) {
		           validFilter.push(itemToCheck)
		           i++
	           } 
	       }
	   }

	   return validFilter.join(',')
   }

   AjaxInputPostPrototype.encodeUrl = function(url) {
	   return url.split(' ').join('+')
   }

   AjaxInputPostPrototype.path = function(url) {
		var path = window.location.pathname
		if (path == '/' || path == '') {
			return url
		}

		var urlRmBackslash = url.charAt(0) !== '/' ? url : url.slice(0,1)
		var splitPath = path.split('/').shift()
		var prefix = ''
		for (var i = 0; i < path.length; i++) {
	        prefix += '../'
		}
		return (prefix + urlRmBackslash)
   } 

   AjaxInputPostPrototype._gatherInputs = function(findInput) {
	   var self = this
	   var formType = self.options.gatherInputsFormIdentifier   
   	   $(formType).each(function(formIndex, formEl) {
		   	if (formEl.nodeName === 'FORM' && formEl.length !== 0) {
		   		var inputs = $(self._checkValidInputTypes(self.options.inputTypes))
		   		var find = 	 $(this).find(inputs).not('input[type="submit"]')
	            find.each(function() {
	            	var name = $(this).attr('name');
	            	var value = $(this).val()            	
	                if (name !== 'undefined') {
	 		            self.settings.postData[name] = value           	
	                }
		            if (typeof findInput !== "undefined" && name === findInput) {
	                    self.options.states[findInput] = $(this)
	                    return
				    }		                
	            })	                	
		     }
        })

   }

   AjaxInputPostPrototype.defineCallback = function(data, state, xhr) {
	   return this.callback.apply(this, arguments)
   }

   AjaxInputPostPrototype._ajaxConnect = function() {
	   var self = this
	   var info = {
		   data: self.settings.postData,
		   url:  self.path(self.url)
	   }
	   var merge = $.extend({}, self.options.ajaxDefaultType, info)
       $.ajax(merge).done(self.callback.bind(self))   
   }

   AjaxInputPostPrototype.inputValue = function(field, value) {
   	   if (typeof field !== 'string' && typeof value !== 'string') {
	       console.error('Field must be in string format')
	       return
   	   }   	
   	   var self = this
   	   var states = self.options.states
   	   this._gatherInputs(field)
       if(states.hasOwnProperty(field)) {
	   	   var inputValue = states[field].val()
	   	   var postValue  = this.settings.postData[field]
	   	   if (inputValue === postValue) {
		   	   if (typeof value !== "undefined") {
			   	   states[field].val(value)
			   	   return states[field].val()
		   	   }
		   	   return states[field].val()
	   	   }
       }
   }


})(jQuery)