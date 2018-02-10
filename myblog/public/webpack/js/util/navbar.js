(function( $, document, window ) {


    var resizing = function( ev ) {

		var burger      = $( '.menu-burger' )
		var main        = $( '.main-nav' )
		var lNav        = $( '.left-nav' )
		var rNav        = $( '.right-nav' )
		var full        = $( '.full-width-navbar' )
		var $win        = $( window ) 	

		if ( $win.width() > 900 ) {

	        full.css({ 'height': '55px' })
			lNav.show()
			rNav.show()
			main.data( 'popped', false )

		} else if( $win.width() < 900 && !main.data( 'popped' ) ) {

			lNav.hide()
			rNav.hide()

		}

    }

    $( document ).ready( function() {

		var burger      = $( '.menu-burger' )
		var main        = $( '.main-nav' )
		var lNav        = $( '.left-nav' )
		var rNav        = $( '.right-nav' )
		var full        = $( '.full-width-navbar' )
		var $win        = $( window )

		resizing()
        $win.resize( resizing )		

		burger.on( 'click', function() {

			if ( !main.data( 'popped' ) ) {

				full.animate({ 'height': '340px' })
				lNav.fadeIn(155)
				rNav.fadeIn(155)	

				main.data( 'popped', true )

			} else {

				lNav.fadeOut(155)
				rNav.fadeOut(155)	
				full.animate({ 'height': '55px' })

				main.data( 'popped', false )						

			}
			
		})

    })

})( jQuery, document, window )
