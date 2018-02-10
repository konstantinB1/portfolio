(function( $, window, document ) {

	var popupClose = function( successMsg, closeAndClean ) {

		var popup  = $( '.post-popup' )
		var status = $( '#post-status span:nth-child(2)' )
        
        status.html( successMsg )

		$( '#post-status' ).slideDown( 355 )
		setTimeout( function() { $( '#post-status' ).slideUp( 255 ) }, 2500 )

	    $('.error-field').fadeOut( 255 )
	    fetchLoadPosts()
	    popupCleaning( closeAndClean )

	    popup.fadeOut( 255 )

	}
 
	var popupCleaning = function( justRestore ) {

		var popup  = $( '.post-popup' )
		var close  = $( '.post-popup-close' )
		var buggy  = $( '.checkbox-variant, #add-post, .icon-edit, .icon-page, .full-width-navbar' )		
		var editor = $( '#editor' ).trumbowyg()

        $( '#post_title' ).val( '' )
        $( '#post_desc' ).val( '' )
        $( '#post_content' ).val( '' )
        $( '#editor' ).val( '' )
        editor.html( '' )

	    if ( justRestore == true ) {
			buggy.each( function( i, e ) { 
				$( e ).css( {'z-index': '0'} )
				$( '.full-width-navbar' ).show(255)
				$( '.admin-posts' ).show(255)		
			})	    	
			return
	    }

	    buggy.each( function( i, e ) { $( e ).css({'z-index': '-9999'}) } )
		$( '.full-width-navbar' ).hide(255)
		$( '.admin-posts' ).hide(255)

		close.click( function() { 
			buggy.each( function( i, e ) { 
				$( e ).css( {'z-index': '0'} )
				$( '.full-width-navbar' ).show(255)
		        $( '.admin-posts' ).show(255)				
				popup.fadeOut(255)
			})
		})		

	}

	var writeData = function( data ) {

	    var container = $( '.posts-container .posts' )
        container.html(' ')

        if ( data.length === 0 ) {
        	container.html('<h3 class="font-light text-base text-center" style="margin-top:20px"> No posts to show </h3>')
        	return
        }

        $.each(data, function( index, post ) {

    		var setClass
    		var style

        	if ( post['post_visible'] == 1 ) {
        		setClass = 'visible'
        		style    = ''
        	} else {
         		setClass = 'hidden'
        		style    = 'background: #FFEFEF'  
        	}
         
	        var html = 
	        `
			  <div class="fetched-post" style="${style}">
			    <div class="checkbox"><div data-checkbox="action" id="post-action-${post.post_id}" class="checkbox-variant"></div></div>
			    <div class="post-id"><p class="font-regular text-xs">${post.post_id}</p></div>
			    <div class="post-info">
			      <p class="font-medium text-post-title text-dark">${post.post_title}</p>
			      <p class="font-light text-xs">created by <span class="font-regular">${post.post_writer}</span> on ${post["post_created"]}</p>
			    </div>
                <ul class="edit">
				   <li> <a href="../p/${post.post_url_slug}" target="_blank"><p class="icon-page"></p></a></li>		    
				   <li> <p class="icon-edit" data-role="edit"></p></li>			    		 
				   <li> <p class="status ${setClass}"></p></li>
                </ul>	       
			  </div>
	        `

	        container.append(html)

        })


        $( '.posts-footer' ).html( '<span class="font-light text-xs text-dark">' + data.length + ' records loaded </span>' )

        container.trigger('posts-loaded')

	}

	var checkboxStuff = function() {

	    var filter    = []

		$( '[data-checkbox="action"]' ).on( 'click', function( click ) {

			var check     = $( this )
			var checked   = '<div class="checkbox-variant-checked"></div>'
			var checkbox  = $( '[data-checkbox="action"]' )
			var button    = $( '#delete-post' ) 	

			button.show()

			if ( filter.length === ( checkbox.length - 1 ) ) {
				checkbox.eq(0).children().first().remove()
			}

	        if ( check.attr( 'id' ) == 'mark-all' ) {

	        	var mark = $( '#mark-all' ).siblings().first()

	            $.each( checkbox, function( index, element ) {

	            	var el = $( element )

					if ( el.children().length === 0 && _.indexOf(filter, id) == -1 ) {

						el.append( checked )

						if ( index !== 0 ) {							

							var id = idFilter( el )
					        filter.push( id )	

						}
				    } 
	            })

	        } else {

				var id = idFilter( check )

				if ( check.children().length === 0 && _.indexOf( filter, id ) == -1 ) {

					check.append( checked )
			        filter.push( id )		

				} else if ( check.children().first().length !== 0 ) {

					check.children().first().remove()
					_.remove( filter, function( n ) { return n == id } )

				}

	        }

			if ( filter.length === 0 ) {
				button.hide()
			}

			button.trigger( 'fetch-delete-data', [filter])

		})

	}

	var processDelete = function(ev, delPosts) {

		var del = $(this)

	    var tempForm  = $( `<form method="post" action="posts/delete-selected" data-ajax="delete"></form>` )
	    var $input    = $( '<input name="delete_posts" type="hidden" />' ) 	

	    $( 'body' ).append( tempForm )
	    tempForm.append( $input )

	    del.click(function(cl) {

	    	$( '.pop-delete' ).fadeIn(155)
	    	
	    	$( '#cancel-delete' ).click(function() {
	    		$( '.pop-delete' ).fadeOut(155)
	    	})

	        $( '#delete-submit' ).click(function() {

	        	$input.val( delPosts.join(', ') )

	            $( 'body' ).append( tempForm )
	            tempForm.append( $input )

	            tempForm.on( 'submit', function( ev ) {

	            	var formId = '[data-ajax="delete"]'

	            	$( '.pop-delete' ).fadeOut(155)

	                new AjaxInputPost( 'admin/posts/delete-selected', function( data ) {

	                	if (data.success == true) { 
	                		$( '#delete-post' ).hide(255)
							fetchLoadPosts()
	                	}

	                }, { gatherInputsFormIdentifier: formId })

	                ev.preventDefault()

	            })

	            tempForm.submit()
	            
	    	})        	

	    })

	}

	var fetchLoadPosts = function() {
	    $.getJSON( '/admin/posts/fetch-all', function( data ) {
	        writeData( data )
	    })
	}

	var addPostStuff = function( clickEvent ) {

		var popup  = $( '.post-popup' )
		var close  = $( '.post-popup-close' )
		var buggy  = $( '.checkbox-variant, #add-post, .icon-edit, .icon-page' )
		var form   = $( '[data-ajax="true"]')
		var submit = $( '#admin-submit-post' )

		$( '#post-status' ).hide()
		popup.fadeIn( 255 ) 
		popupCleaning()
	    form.off( 'submit' )

        form.on( 'submit', function( ev ) {

		    var ajax = new AjaxInputPost( 'admin/posts/process', function( data ) {

			    if ( data[ 0 ] !== 'success' ) {
	                $('.error-field').fadeIn( 255 )
                    $('.error-field').displayErrors({ data: data[ 0 ] })	   		    
			    } else {
	            	popupClose( 'Post added successfuly!', true )	
      
			    }

		    }) 
           
        	ev.preventDefault()
        })

	}

    var editPost = function( editEv ) {
	            
        var el     = $( editEv.target )
        var id     = $( $.parseHTML( el.parent().parent().siblings().eq( 1 ).html() ) ).html()
		var popup  = $( '.post-popup' )
		var form   = $( '[data-ajax="true"]')
		var submit = $( '#admin-submit-post' )

		$( '#post-status' ).hide(155)
		popup.fadeIn(255)
		form.attr( 'action', 'posts/request-post/' + id )
		popupCleaning()
		form.off( 'submit' )

        $.get( 'posts/request-post/' + id, function( data ) {

        	var json = data[ 0 ]
            var editor = $( '#editor' ).trumbowyg()
            
	        $( '#post_title' ).val( json[ 'post_title' ] )
	        $( '#post_desc' ).val( json[ "post_desc " ] )
	        $( '#post_content' ).val( json[ "post_content" ] )

            var allowCommentsCheckbox = $( '#allow-comments' )
            var allowCommentsInput    = $( '#post_allow_comments' )

            var visibleCheckbox       = $( '#post-is-visible' )
            var visibleInput          = $( '#post_visible' )    

            var a                     = 'checkbox-active'       

	        visibleInput.val( json[ "post_visible" ] )
	        allowCommentsInput.val( json[ "post_allow_comments" ] )


  	        if( visibleInput.val() == 0 && visibleCheckbox.hasClass( a ) ) {
	        	visibleCheckbox.removeClass( a )
            } else {
      	        visibleCheckbox.addClass( a )      	
            }

  	        if( allowCommentsInput.val() == 0 && allowCommentsCheckbox.hasClass( a ) ) {
	        	allowCommentsCheckbox.removeClass( a )
            } else {
      	        allowCommentsCheckbox.addClass( a )      	
            }

	        editor.html( json[ 'post_content' ] )
	        
	        form.on( 'submit', function( submitEv ) {

                new AjaxInputPost( 'admin/posts/process/' + id, function( data ) {

                    if ( data[ 0 ] !== 'success' ) {

                        $('.error-field').fadeIn(255)
                    	$('.error-field').displayErrors({ data: data[ 0 ] })

                    } else {

						popupClose( 'Post edited successfuly!', true )
						return

                    }

                }) 

	        	submitEv.preventDefault()
	        } )

        })

	}

	var changeVisibility = function( ev ) { 

		var el         = $( this )
        var id         = ( el.parent().parent().parent().children().eq(1).html() ).match( /([^\W\D]\d)/g ).join('')

		var tempForm   = $( 'body' ).append(`

				<form action="posts/toggle-visible/?${id}" data-ajax="visibility">
                    <input id="visible-val" type="hidden" name="post_visible" value="${id}" />
				</form>

		`)

		var form      = $( '[data-ajax="visibility"]' )
		var visiblity = $( '[data-ajax="visibility"] #visible-val' )


       if ( el.hasClass( 'visible' ) ) {
           	el.removeClass( 'visible' ).addClass( 'hidden' )	
           	visiblity.val( 0 )           	
       } else {
           	el.addClass( 'visible' ).removeClass( 'hidden' )
           	visiblity.val( 1 )      		           	
       }

       new AjaxInputPost( 'admin/posts/toggle-visible/' + id + '?post_visible=' + visiblity.val(), function( data ) {
          
           var post = el.parent()
           var vis  = data['visible']
   		   var setClass
           var style

            if ( vis == 0 ) {
                el.parent().parent().parent().css({'background':'#FFEFEF'})
        	} else {
         		el.parent().parent().parent().css({'background':''})
        		style    = 'background: #FFEBEB'  
        	}
           
       }, { gatherInputsFormIdentifier: '[data-ajax="visibility"]' })

       form.remove()

	}

	var idFilter = function( id ) {
		return id.attr( 'id' ).match( /[0-9]/g ).reduce(function( a, b ) { return a + b } )
	}


	$(document).ready(function() {

        if ( window.location.pathname !== '/admin/posts' ) {
            return
        }		

		fetchLoadPosts()

		var ch = $( '.checkbox-pink' )

		ch.click( function( cl ) {

	        if( $( this ).hasClass( 'checkbox-active' ) ) {
	        	$( this ).removeClass( 'checkbox-active' )

	        	if( $( cl.target ).attr( 'id' ) == 'post-is-visible' ) {
	        		$( '#post_visible' ).val( 0 )
	        	}

	        	if( $( cl.target ).attr( 'id' ) == 'allow-comments' ) {
	        		$( '#post_allow_comments' ).val( 0 )
	        	}	        	


	        } else {
	        	$( this ).addClass( 'checkbox-active' )

	        	if( $( cl.target ).attr( 'id' ) == 'post-is-visible' ) {
	        		$( '#post_visible' ).val( 1 )
	        	}

	        	if( $( cl.target ).attr( 'id' ) == 'allow-comments' ) {
	        		$( '#post_allow_comments' ).val( 1 )
	        	}	        	

	        }

		})		

		var container = $( '.posts-container' )
		var delButton = $( '#delete-post' )
	    var markAll   = $( '#mark-all' )
		var popup     = $( '.post-popup' )

        $( '#delete-post' ).on( 'fetch-delete-data', processDelete )
		$( '.icon-edit' ).click( editPost )
		$( '.status' ).click( changeVisibility )
	    $( '#add-post' ).click( addPostStuff )	

		container.on( 'posts-loaded', function( ev ) {

			checkboxStuff( ev )

			var trumbowyg =	$('#editor').trumbowyg({svgPath: '../js/ui/icons.svg'});
			trumbowyg.on( 'tbwchange', function() { 
				var range = trumbowyg.html();
			    var cont  = $('#post_content').val( range )
			 })	

			$( '.icon-edit' ).click( editPost )
			$( '.status' ).click( changeVisibility )
		    $( '#add-post' ).click( addPostStuff )			

		})

	})


})( jQuery, window, document )