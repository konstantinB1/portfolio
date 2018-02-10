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
        var errors = $('.errors')

        if (checkErrors(data)) {

            var form = $('[data-ajax="true"]')
            form.attr('action', '/')
            $('#admin_login_submit').unbind('click')
            form.submit()

            window.location.href = '/admin'

        } else { 

            $('.errors-pop').addClass('errors-pop-go')
            
        }
    }


	$(document).ready(function() {

        var location = window.location.pathname

        if ( window.location.pathname !== '/admin/login' ) {
            return
        }

        $('.checkbox').click(function() {
        	if($('#admin_remember').val() == 0) {
	            $('#admin_remember').val(1)
        	} else {
 	            $('#admin_remember').val(0)       		
        	}
        })

		$('#admin_login_submit').on('click', function(ev) {
			ev.preventDefault()
		    var filter = new AjaxInputPost('admin/login', login)
		})

        if ($('#post_allow_comments').val() == 1) {
            $('.checkbox').attr('aria-checked', true)
            $('.checkbox').removeClass('checkbox-innactive')    
        }

        $('.checkbox').click(function(ev) {
            if (!$(this).hasClass('checkbox-innactive')) {
                $(this).addClass('checkbox-innactive')
                $(this).attr('aria-checked', false)
                $('#post_allow_comments').val('0')
            } else {
                $(this).removeClass('checkbox-innactive')
                $(this).attr('aria-checked', true)  
                $('#post_allow_comments').val(1)                            
            }
        })   

	})


})(jQuery, window, document)