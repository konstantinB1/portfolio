var testing = {

  get: function ( url, callback ) {

    if( [ "", null, undefined ].indexOf( url ) >= 0 ) 
    	return false;

    return $.ajax({
      method: 'GET',
      dataType: 'html',
      url: url,
      success: function( data, status, req ) {
        callback( data, status, req );
      },
      error: function ( request, status, error ) {
        callback( error );

      }

    });

  },

  extract: function( data ) {
     
	  if( [ "", null, undefined ].indexOf( data ) >= 0 ) 
	  	return false

	  this.display( $.parseHTML( data ) );

  },

  puns: function( str ) {
    return str
           .split(' ')
           .sort( function( a, b ) { return a.localeCompare( b ); })
           .join(' ')
           .replace( new RegExp(/[^(a-zA-Z0-9)]/, 'gim'), ' ');  
  },

  modifyTag: function( it, span, test ) {

      if( it.nodeName !== '#text' ) {

        if( it.tagName === 'P') { 

           // Leave puns and sorting for specific testing case
           if( test !== true ) {

             it.innerHTML = this.puns( it.innerHTML );

           }

        }

           if( Array.isArray( span ) && span != null ) {

             if( span[1] || span[0] === 'o')
               it.innerHTML = it.innerHTML.replace( new RegExp(/o/, 'gi'), '<span class="my-blue">o</span>' );

             if( span[1] || span[0] === 'r')
               it.innerHTML = it.innerHTML.replace( new RegExp(/r/, 'gi'), '<span class="my-orange">r</span>' ); 
           }

      }

    return it.innerHTML;

  },

  display: function( data ) {

  	var cont = $('.container'),
  	    length = data.length,
  	    i = 0;

    for( ; i < length; i++ ) {

    	var it = data[i];

      this.modifyTag( it, ['r', 'o'] );         

    		cont.append( it );

     }

  }
  
};
     var data = { innerHTML: 'Egone quaeqrqwrorois, inquit, quid sentiam?' };

testing.get( 'lorem.html', testing.extract.bind( testing ) );


// /*
//  * Hi there and welcome to this little coding kata. Here is what you should do in javascript:
//  * 
//  * 1. There is a file on the webserver, named lorem.html. It contains a lot of (html) text. 
//  *    Write a javascript function, which fetches the contents of this file asynchronously 
//  *    from the server and add the contents into the <div class="container"> div of the website.
//  * 
//  * 2. There are lots of o's in the imported text. As the letter o is very important for this exercise, 
//  *    we should highlight it. Highlight all the o's with my-blue background (see styles.css for 
//  *    more information about that color) and white font color, a 30% bigger font size and add some 
//  *    padding so that every o stands out.
//  * 
//  * 3. The letter 'r' is also very important. Highlight it in the same way, but use the my-orange
//  *    color this time.
//  * 
//  * 4. Instead of text with "meaning", the PO wants to have all the words which are placed in paragraph
//  *    tags to be sorted in alphabetical order. Get rid of all the punctuation, just display the words
//  *    in the right order. Example: <p>what a requirement</p> becomes <p>a requirement what</p>. 
//  * 
//  */

