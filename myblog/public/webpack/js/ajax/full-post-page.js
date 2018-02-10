( function( $, document, window ) {

	var loadComments = function( data ) {

		var container = $( '.comments-list' )

    	if( data.length == 0 ) {
            container.append( '<h2 class="no-comments font-regular text-sm text-center"> No comments for this post </h2>' )
            return
    	}

    	$.each( data, function( i, el ) {
            
            var name = el[ 'comment_name' ]
            var body = el[ 'comment_body' ]
            var date = moment( el[ 'comment_created' ] ).fromNow()
            var borderRadius

            name = name.length === 0 ? 'Anonymus' : name;

            switch( true ) {
                case data.length === 1:
                    borderRadius = 'single-comment'
                    break;
                case data.length === 2:
                    borderRadius = 'two-comments'
                    break
                default:
	                borderRadius = 'multiple-comments'
	                break;
            }

            var html = 
            `
                <div class="user-comment ${ borderRadius }">
	                <p class="name-and-date text-sm font-medium"> ${ name } 
	                <span class="text-xs text-lgray font-light"> ${ date } </span>
	                </p>
	                <p class="text-xs font-regular"> ${ body } </p> 
                </div>
            `

            container.append( html )

    	})
        
    }

    var loadNewComment = function( data ) {
	    
	    if( data.error ) {
	    	var errField =  $('.error-field')

	        errField.displayErrors({ data: data['0'] })
	        errField.fadeIn(255)

	        return
	    }

	   $( '.no-comments' ).hide()

	 	var container = $( '.comments-list' )
	    var name = data[ 0 ][ 'comment_name' ]
	    var body = data[ 0 ][ 'comment_body' ]
	    var date = moment( data[ 0 ][ 'comment_created' ] ).fromNow()
	    var borderRadius
	    var children = container.children().length

	    name = name.length === 0 ? 'Anonymus' : name;

        switch( true ) {
            case children === 1:
                borderRadius = 'single-comment'
                break;
            case children === 2:
                borderRadius = 'two-comments'
                break
            default:
                borderRadius = 'multiple-comments'
                break;
        }	    

	    var html = 
	    `
	        <div class="user-comment ${ borderRadius }">
	            <p class="name-and-date text-sm font-medium"> ${ name } 
	            <span class="text-xs text-lgray font-light"> ${ date } </span>
	            </p>
	            <p class="text-xs font-regular"> ${ body } </p> 
	        </div>
	    `		
	     container.prepend( html )   
	     container.children().first().hide().delay(150).show()

	     $( '#comment-name' ).val('')
	     $( '#comment-body' ).val('')

     

	}

    var loadPost = function( postData ) {

    	var postTitle = window.location.pathname.split( '/' )[2]

		$.get( '../fetch-post/' + postTitle, function( data ) {

		    var post = data[ 0 ]
		    var page = $( '.post-readfull-wrap' )
		    var date = moment( post[ 'post_created' ] ).fromNow()

		    page.append( `
				    	 <h1 class="text-xl font-light text-dark">${post[ 'post_title' ]}</h1>
				    	 <p class="post-writer text-dark font-regular text-xs">posted by <span class="font-bold text-xs">
				    	 ${post[ 'post_writer' ]}
				    	 </span> ${ date }</p>
				    	 <div class="post-content"></div>
				    	`
		    ).hide()
		     .fadeIn(455)

		    var content = $.parseHTML( post[ 'post_content' ] )
		    var contDiv = page.children().eq(2)
		    var textNode

		    $.each( content, function( i, el ) {

		         if ( el.nodeName === 'P' ) {
			         $( el ).addClass('content-p font-regular text-sm')
                     if ( $( el ).children().length !== 0 ) {
                     	var first = $( el ).children().first()
	                     if ( first[ 0 ].nodeName === 'IMG' ) {
	                     	first.addClass( 'content-img' )
	                     }
                     }
		         }

		         if ( el.nodeName === 'span' ) {
			         $( el ).addClass('content-p font-regular text-xs')
		         }		         

		         if ( el.nodeName === 'BLOCKQUOTE' ) {
			         $( el ).addClass('content-p font-light text-sm')
		         }		         

		         if ( el.nodeName === 'OL' ) {
			         $( el ).addClass('content-ol font-regular text-sm')
		         }

		         if ( el.nodeName === 'img' || el.nodeName === 'IMG' ) {
			         $( el ).addClass('content-img')
		         }	         		         

		         if ( 
		         	  el.nodeName === 'H1' || 
		         	  el.nodeName === 'H2' || 
		         	  el.nodeName === 'H3' || 
		         	  el.nodeName === 'H4' ||
		         	  el.nodeName === 'H5'          	  
		         	) {

			         $( el ).addClass('content-h font-medium ')

		         }


		        el.nodeType !== 3 ? contDiv.append( $( el ) )
		                          : contDiv.append( '<p class="content-p font-regular text-sm">' + el.textContent + '</p>' )

		    })

		    if ( post[ 'post_allow_comments' ] == 1 ) {

		    	$( '.post-comments' ).show()
		    	$( '.comments-list' ).trigger( 'load-comments', [ post[ 'post_id' ] ] )

		    } else {

                $( '.post-comments' ).show()
		    	$( '.post-comments' ).html( '<h2 class="text-center text-dark text-base font-light"> Comments are disabled for this post </h2>' )

		    }


		    $( '[data-ajax="true"]' ).trigger( 'post-loaded', [ post[ 'post_id' ] ] )
		    
		})
    }



	$( document ).ready( function() {

		if ( !window.location.pathname.includes('/p/') ) {
			return
		}

		var form = $( '[data-ajax="true"]' )
	 
		loadPost()

		$( '.comments-list' ).on( 'load-comments', function( ev, postId ) {

	        $.get( '../comments/list-comments/' + postId, loadComments)

		})

        form.on( 'post-loaded', function( evLoaded, postId ) {

        	evLoaded.stopImmediatePropagation()	

	        form.submit( function( evSubmit ) {

				new AjaxInputPost( '../comments/new-comment/' + postId, loadNewComment)
	          
		        evSubmit.preventDefault()	

	    	})
        })
	})

})( jQuery, document, window )