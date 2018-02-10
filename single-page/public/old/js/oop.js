var oojs = (function(oojs) {

	let iterate = function (el, index, self) {

		},

	    createToolbarItems = function(itemElements) {

		let items = [];

		itemElements.forEach(function(el, index, self) {

		});

		return items;

	};

	oojs.createToolbar = function(elementId) {
		let el = document.getElementById(elementId),
		    items = document.querySelectorAll('.toolbar-item');

		    return {
		    	items: createToolbarItems(items)
		    }


	    
	};


	return oojs;

}(oojs ? oojs : {}));
