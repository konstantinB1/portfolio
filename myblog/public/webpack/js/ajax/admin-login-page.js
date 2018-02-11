(function($, window, document) {


	var checkErrors = function(data) {

        
        var email     = data['admin_email']
        var pass      = data['admin_password']      
        var emailErr  = $('#email-errors')
        var passErr   = $('#pass-errors')
        var cred      = $('#credentials')

        if (($.isArray(data) && data.length == 0) ||  ($.isPlainObject(data) && $.isEmptyObject(data))) {
            return true
        }

        cred.html('')
        if ($.isArray(data)) {
            cred.append('<p class="error-title">Invalid credentials</p>')
            $.each(data, function(index, element) {
                var append = cred.append('<p class="error"> -' + element + '</p>')
            }) 
        }

        emailErr.html('')
        if (!$.isEmptyObject(email)) {
            emailErr.append('<p class="error-title">Email</p>')
            $.each(email, function(index, element) {
                var append = emailErr.append('<p class="error"> -' + element + '</p>')
            }) 
        }

        passErr.html('')        
        if (!$.isEmptyObject(pass)) {
            passErr.append('<p class="error-title">Password</p>')
            $.each(pass, function(index, element) {
                var append = passErr.append('<p class="error"> -' + element + '</p>')
            }) 
        }       
	}

    var login = function(data) {



        console.log(data['error'])

        if ( data.error !== true ) {

            var form = $('[data-ajax="true"]')
            form.attr('action', '/')
            $('#admin_login_submit').unbind('click')
            form.submit()

            window.location.href = '/admin'

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