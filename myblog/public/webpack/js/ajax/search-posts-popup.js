( function( $, window, document ) {

	var findPosts = function( data ) {

		if ( data.length !== 0 ) {

			var container = $( '#search-container' )

			$('.loader').hide()

			container.html( ' ' )
		    $.each( data, function( i, post ) {

                var date = moment( post[ 'post_created' ], 'YYYYMMDD' ).fromNow()
		    	var html = 	
		    	` 
			    	<div class="post post-full" data-post-url="${ post[ 'post_url_slug' ] }">
			          <h1 class="text-ptitle font-bold">${ post[ 'post_title' ] }</h1>
			          <p class="text-xs font-regular">${ post[ "post_desc " ] }</p>	 
			          <p class="date text-xs font-light">${ date }</p>         	          
				    </div>
				`

                container.append( html )
		    	
		    })			

			container.trigger( 'results-out' )
		}
	}

	$( document ).ready( function() {

		$( '.loader' ).hide()
		$( '.search-layer' ).hide()

		$( '.icon-search' ).on( 'click', function( ev ) {

			ev.stopPropagation()
			ev.stopImmediatePropagation()

			var container = $( '#search-container' )

			$( '.admin-popup' ).hide()

            $( '.comments-section-wrap').fadeOut( 255 )
            $('.admin-login' ).fadeOut( 255 )

            container.on( 'results-out', function( ev ) {

            	$( this ).children().click( function( clEv ) {

            		var el   = $( clEv.delegateTarget )
            		var data = el.data( 'postUrl' )
            		window.location.href = '/p/' + data

            	})
            
            })          

			$( '#search' ).on( 'keypress', function( keyEv ) {

				var settings = {
		           gatherInputsFormIdentifier: '[data-ajax="search"]', 					
				}
				keyEv.stopPropagation()			
				var results = new AjaxInputPost( 'search', findPosts, settings );
			})

			$( 'input.search' )[0].focus()
			$( '.search-layer' ).fadeIn(255)
			$( 'span.close' ).on('click', function() {
				$( '.search-layer' ).html()				
				$( '.search-layer' ).fadeOut(255)
                $( '.comments-section-wrap' ).fadeIn(255)	
                $( '.admin-login' ).fadeIn(255)			
			})
		})
	})

})( jQuery, window, document )