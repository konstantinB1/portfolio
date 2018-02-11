(function($, window, document) {

    var login = function(data) {

        if ( data.error !== true ) {

            window.location = '/admin'

        } else { 
            
            var errors = $('.error-field')

            errors.fadeIn( 255 )
            errors.displayErrors({ data: data['0'] })    
            
        }
    }


	$(document).ready(function() {

        var location = window.location.pathname

        if ( window.location.pathname !== '/admin/login' ) return

		$('[data-ajax="true"]').submit(function(ev) {
			ev.preventDefault()
		    var filter = new AjaxInputPost('admin/login', login)
		})  

	})


})(jQuery, window, document)