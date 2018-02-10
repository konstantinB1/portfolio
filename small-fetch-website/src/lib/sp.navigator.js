'use strict';

    // Pollyfill for ES6 Object.prototype.assign
    // Taken from MDN website
	if (typeof Object.assign != 'function') {
	  // Must be writable: true, enumerable: false, configurable: true
	  Object.defineProperty(Object, "assign", {
	    value: function assign(target, varArgs) { // .length of function is 2
	      'use strict';
	      if (target == null) { // TypeError if undefined or null
	        throw new TypeError('Cannot convert undefined or null to object');
	      }

	      var to = Object(target);

	      for (var index = 1; index < arguments.length; index++) {
	        var nextSource = arguments[index];

	        if (nextSource != null) { // Skip over if undefined or null
	          for (var nextKey in nextSource) {
	            // Avoid bugs when hasOwnProperty is shadowed
	            if (Object.prototype.hasOwnProperty.call(nextSource, nextKey)) {
	              to[nextKey] = nextSource[nextKey];
	            }
	          }
	        }
	      }
	      return to;
	    },
	    writable: true,
	    configurable: true
	  });
	}	

 var _settings = 
 {
	 higlightCurrent: 0
 }

;(function(window, document) {

	var userOptions = 
	{
		highlightClass: 'sp-highlight'
		navElement: '[data-ssp="navigation"]',

	}

    // Constructor
	function SimpleSinglePage(options)
	{

		this.element = document.querySelector(element)
		this.options = Object.assign({}, options, userOptions)

	}

	SimpleSinglePage.prototype.defineLink = function(type, callback)
	{
		if (typeof type !== 'undefined')
	        return Array.isArray(type) ? this._iterateRequests(type) : this._makeRequest(type, callback)
	}

	SimpleSinglePage.prototype._highlight = function() 
	{
		var navElement = document.querySelector(this.options.navElement)
		var highlight = document.createElement('div');
		var highlightClass = this.options.hasOwnProperty('highlightClass') ? 
		                     this.options.highlightClass : 'sp-highlight'
		var navChildren = navElement.children
		var higlihgtWidth = (100 / navChildren.length) + '%'

		if (navElement.querySelectorAll('.' + highlightClass) == null) return;
		if (navElement == 'undefined')
			return console.error('Navbar not defined. Please put data-spnavbar="vertical" or' + 
				                 'data-spnavbar="horizontal" to desired navbar space')

		// Should make sure every child element has the same class so that the higlight element
		// has the same proportions for each respected element
		var checkWidth = navChildren.forEach(function(child, index, self) {

			var display = window.getComputedStyle(child).display

			// When element is not visible javascript doesn't caluclate pixels from elements
			// This ensures the value will return percentages
			// https://stackoverflow.com/questions/744319/get-css-rules-percentage-value-in-jquery
		    child.style.display = 'none'
            
            if (window.getComputedStyle(child).width !== window.getComputedStyle(self[index]).width) {
            	// Revert element back to initial defined display type
            	child.style.display = display
         	    child.style.width = higlihgtWidth
            } else {
            	return false;
            }

     	    if (index == self.length)
     	    	return true

		})

		higlight.classList.add(highlightClass)
        highlight.setAttribute('data-element-position', _settings.highlightCurrent)

        navElement.appendChild(highlight)

	}

	window.onreadystatechange = function(e)
	{

	}


	window.onload = function(e)
	{

	}

})(window, document)