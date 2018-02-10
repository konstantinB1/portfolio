( function( $, document, window) {

	var getAll = function() {

		  $.get( 'fetch-all', function( data ) {

		    var cont  = $( '.index-posts-container' )
		    var vis   = data[ 'post_visible' ]

			$.each( data, function( i, post ) {

                if ( post[ 'post_visible' ] !== 1 ) {
                	return true
                }

				var date = moment( post[ 'post_created' ], 'YYYYMMDD' ).fromNow()
				var loc  = window.location.href
				var html = 
				` <div class="post">
			          <h1 class="text-ptitle font-bold">${ post[ 'post_title' ] }</h1>
			          <p class="text-xs font-regular">${ post[ "post_desc " ] }</p>	 
			          <p class="date text-xs font-light">${ date }</p>         	          
				  </div>
				`
				cont.append( $( html ) ).hide().fadeIn(355)

				cont.children().last().data( 'data-post', post )
			    
			})

			if ( $.isEmptyObject( data ) || cont.children().length === 0 ) {
				cont.prepend( '<h2 class="text-md font-light text-heading-green"> No available posts right now :( </h2>' )
			}

		    cont.trigger( 'posts-loaded' )

		})		
	}


	$( document ).ready( function() {

		if ( window.location.pathname !== '/' ) {
			return
		}

		getAll()

		var cont         = $( '.index-posts-container' )
		var transform    = {
			initial:    0,
			horiz:      550,
			horizEven:  -550,
		}

		cont.on( 'posts-loaded', function( ev ) {

			var posts = $( this ).children()
			var that  = $( this )
		    
		    posts.click( function( clickEl ) { 
		    
			    var post   = $( clickEl.currentTarget )

		        that.fadeOut(255).delay(200).queue( function(){
					window.location.href = 'p/' + post.data( 'data-post' ).post_url_slug        	
		        })
			   
		    })
		})		
	})

})( jQuery, document, window )