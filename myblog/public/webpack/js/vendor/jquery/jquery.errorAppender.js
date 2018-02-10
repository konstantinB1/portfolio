( function( $, document, window, undefined ) {

    var defaults = {
    	proper:           [],
    	errorHeaderClass: 'text-sm font-regular',
    	errorItemClass:   'text-xs font-regular text-error',
    }

    function ListErrors( element, options ) {

    	this.element = element
    	this.options = $.extend( {}, defaults, options )

        
        $( this.element ).html( ' ' )

        console.log(options)

    	this.makeProperArray()
    	this.appendToEl()
    }

    ListErrors.prototype.makeProperArray = function() {
        var that         = this
    	var o            = this.options
    	var iterableItem = o[ 'data' ]
    	var keys         = Object.keys( iterableItem )
    	keys.forEach( function( e ) {
    		o.proper.push ( 
    			e.split('_').join(' ').replace( /[^\W_]+/g, function( txt ) {
		            return txt.charAt( 0 ).toUpperCase() + txt.substr( 1 )
	    		})
    		)
    	})
    }

    ListErrors.prototype.appendToEl = function() {
    	var o            = this.options
    	var proper       = o.proper
    	var iterableItem = o.data
    	var el           = this.element
    	var i            = 0
	    $.each( iterableItem, function( index, item ) {
	    	$( el ).append( '<h3 class="' + o.errorHeaderClass + '">' + o.proper[ i ] + '</h3>' )
	        $.each( item, function( errIndex, errItem ) { 
	            $( el ).append( '<p class="' + o.errorItemClass + '">' + errItem  + '</p>' )
	        })
	        i++
	    })
    }

	$.fn.displayErrors = function ( options ) {
	    return this.each( function () {
	        if ( !$.data( this, 'data-errors' )) {
	            $.data( this, 'data-errors',
	            new ListErrors( this, options ) );
	        }
	    });
	}

})( jQuery, document, window )