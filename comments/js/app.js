
    var fetch = function( indicator ) {

		$.get( 'inc/process.php?posts=' + indicator, function( data ) {

			var container   = $( '.comments-container' )

			if ( data === 'allgone') {

				var onlyDeleted = container.find( '[data-delete="true"]' )
				var del         = container.append('<h2> Posts deleted </h2>')
				var heading     = container.find( 'h2' )

                onlyDeleted.each( function( i, c ) { $( c ).hide( 555 ).remove() })

                heading.fadeIn( 255 )
                       .delay( 2000 )
                       .fadeOut( 255 )
                       .queue( function( ) { $(this).remove().dequeue( $( this ) ) } )


			}				

			if ( indicator === 'last-added' ) {

			    var json = JSON.parse( data )	

			    var id       = json[0]
	            var postName = json[1]
	            var postMsg  = json[2]

				var html = 
				`				
					<div class="user-comment">
						<p class="user-name">
							${ postName }
						</p>
						<p class="user-msg">
							${ postMsg }
						</p>
						<a class="delete-link" data-com-id="${ id }" href="#"> delete </a>
					</div>
				`	     

				container.append( html )

			    container.find( '.user-comment .delete-link' ).trigger( 'com-loaded' )

                var find = container.find( '.user-comment' ).hide()

				find.fadeIn( 255 ) 	

				var inputs = $( '#myform' ).find( 'input, textarea' )

				$.each( inputs, function( inpIndex, inpEl ) {

                    var el = $(inpEl)
	                el.val(' ')

				})

				$( '#name' ).attr( 'placeholder', 'Your name' )
				$( '#message' ).attr( 'placeholder', 'Your comment' )				

				return            

			}

			if ( indicator === 'all' ) {

				var json = JSON.parse( data )	

				if( data == null ) {

					container.prepend( '<h2> No posts right now :( </h2>' )
				}

		        $.each( json, function( index, post ) {

					var html = 
					`				
						<div class="user-comment" data-pid="${ post[ 'id' ] }">
							<p class="user-name">
								${ post[ 'name' ] }
							</p>
							<p class="user-msg">
								${ post[ 'message' ] }
							</p>
						<a class="delete-link" data-com-id="${ post[ 'id' ] }" href="#"> delete </a>							
						</div>
					`	     
					container.append( html )

	                var find = container.find( '.user-comment' ).hide()
					find.show( 255 )   	

					container.trigger( 'com-loaded' )

		        })
			}
		})
    }


	$( document ).ready( function() {

		fetch( 'all' )

		$( '.comments-container' ).on( 'com-loaded', function() {

			$( '.delete-link' ).click( function( clEv ) {
				
	            var el = $( clEv.delegateTarget )
	            var id = el.data( 'comId' )

	            $.get( 'inc/process.php?posts=delete&id=' + id, function( del, status, xhr ) {
					
					if ( del == 'comgone' ) {
						$( el ).parent().fadeOut( 255 )
					}

	            })

			})

		})
  
		$( '#delete-all' ).click( function() {

			var cont = $( '.comments-container .user-comment' )

			if ( cont.length === 0 ) { return }

		    cont.each( function( i, el ) {  $(el).attr( 'data-delete', true ) })

		    fetch( 'delete-all' )		    

		})


		$( '#myform' ).on( 'submit', function( submitEvent ) {
 
            submitEvent.preventDefault()

			var form      =  $( this )
			var inputs    =  form.find( 'input, textarea' )
			var serialize =  form.serialize()

			var request   = $.ajax({
				url:  'inc/process.php?action=submit',
				type: 'post',
				data: serialize
			})

			var inputName = $( '#name' ).val()
			var msgName   = $( '#message' ).val()

			if ( inputName == '' && msgName == '' || inputName.length < 4 && msgName.length < 5 ) {

				$( '.errors' ).fadeIn( 255 ).delay( 3200 ).fadeOut( 255 )
				return

			}

			request.done( function( data ) {

				var container = $( '.comments-container' )

				if ( data === 'success' ) { 

					fetch( 'last-added' ) 
				}

			})
		})
	})
