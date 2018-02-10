var lazy = (function(lazy) {

	var towatch = [];
	var doc = document;

	lazy.isValid = function(el) {
        if(typeof el === 'string') {
        	if(doc.querySelector(el).nodeType === 'IMG') {
	        	if(el.charAt(0) === '.')
	        		el = doc.querySelector(el);
	        	else if(el.charAt(0) === '#') {
	        		el = doc.getElementById(el);
	        	}        		
        	}        	
        }
	}

    lazy.load = function(data) {
    	if(typeof data === 'object' && Array.isArray(data)) {
    		for(var i = 0; i < data.length; i++) {
                if(lazy.isValid(data[i])) {
	                toWatch[i] = data[i];
	                console.log(toWatch);
                }
    		}
    	}
    } 


 return lazy;

})(lazy || {});
