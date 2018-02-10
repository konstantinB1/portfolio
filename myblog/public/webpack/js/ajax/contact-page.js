(function( $, document, window ) {

	$( document ).ready( function()  {

		if ( window.location.pathname !== '/contact' ) {
			return
		}

		 var form = $( '[data-ajax="true"]' )

		 form.submit( function( ev ) {
             
             new AjaxInputPost( 'contact-process', function( data ) {
	             
				 if( data[1] == 'error' ) {

				 	$( '.error-field' ).fadeIn( 255 ).displayErrors({ data: data[0] })

				 }

             })

	         ev.preventDefault()
		 })

	})


})( $, document, window )