var assert = chai.assert;

describe(' 1) AJAX ', function() {

  beforeEach( function() {

     this.callback = sinon.spy();

  });


  it( 'return false if url is not passed ', function( done ) {

     assert.equal( false, testing.get( '   '.trim() ));
     assert.equal( false, testing.get());
     assert.equal( false, testing.get(null));

     done();

  });

  it(' callback should be function... ', function ( done ) {

    testing.get( 'lorem.html', this.callback );
    assert.isFunction( this.callback );

    done();
      
  });

   it(' checking if callback is called ', function ( done ) {


     sinon.stub( $, 'ajax', function( options ) {

        var dfd = $.Deferred();

        if( options.success ) 
          dfd.done( options.success() );

        if( options.error ) 
          dfd.fail( options.error );


        dfd.success = dfd.done;
        dfd.error = dfd.fail;

        return dfd;

     });

    testing.get( 'lorem.html', this.callback );

    // Spying on original callback 
    sinon.assert.called( this.callback );
    $.ajax.restore();

    done();
      
  }); 

   it(' should return status 200 and data type text/html ', function ( done ) {    

    this.server = sinon.fakeServer.create();

    // Expected server response to our lorem.html url
    this.server.respondWith( 'GET', 'lorem.html', [ 200, { 'Content-Type':'text/html'}, 'data' ]);


    testing.get( 'lorem.html', this.callback );
    this.server.respond();

    var req = this.server.requests,
        res = this.server.responses[0];


    // Compare request to response
    assert.isAbove( req.length, 0 , ' Server should make a request ' );
    assert.equal( req[0].status, 200 , ' Server status should return 200' );
    assert.equal( res.response[0], 200 , ' Response should be 200 ' );

    assert.include( req[0].requestHeaders['Accept'],
                    res.response[1]['Content-Type']);


    this.server.restore();

    done();

  }); 



});  


describe( '2) and 3) Find letters O and R in DOM element ', function() {

  beforeEach( function() {

     var data = { innerHTML: 'Egone quaeqrqwrorois, inquit, quid sentiam?' };

  });

  it('Check if object has innerHTML tag so we know it\'s a valid dom element  ', function( done ) {

     // Dummy test string
     var str = 'Egone quaeqrqwrorois, inquit, quid sentiam?',
         func = testing.modifyTag( str );


     assert.isObject( str, 'can\'t be string');
     assert.equal( func, data.innerHTML, ' func wont be able to access innerHTML property cause its a string' );

     done();

  });

    it('If we pass dummy object data that simulates dom object it will work ', function( done ) {

     func = testing.modifyTag( data );

     assert.isObject( data, 'valid argumnent');
     assert.equal( func, data.innerHTML, 'Works like charm' );

     done();

  });

    it('Will modify data by array arguments o and r independently. Checks only O ', function( done ) {

         // Expected outcome
     var expect = { innerHTML: 'Egone quaeqrqwrorois, inquit, quid sentiam?' };
         expect.innerHTML = expect.innerHTML.replace( new RegExp(/o/, 'gi'), '<span class="my-blue">o</span>');

     // Test original like in function
     func = testing.modifyTag( data, ['o'], true );

     assert.equal( func, expect.innerHTML );

     done();

  });

     it(' Checks only R ', function( done ) {

     var expect = { innerHTML: 'Egone quaeqrqwrorois, inquit, quid sentiam?' };

         // Reset to original state
         data.innerHTML = expect.innerHTML;

         expect.innerHTML = expect.innerHTML.replace( new RegExp(/r/, 'gi'), '<span class="my-orange">r</span>');

         func = testing.modifyTag( data, ['r'], true );

     assert.equal( func, expect.innerHTML );

     done();

  });
  
     it('Checks both ', function( done ) {

         expect = { innerHTML: 'Egone quaeqrqwrorois, inquit, quid sentiam?' };

         data.innerHTML = expect.innerHTML;        
         expect.innerHTML = expect.innerHTML.replace( new RegExp(/r/, 'gi'), '<span class="my-orange">r</span>')
                                            .replace( new RegExp(/o/, 'gi'), '<span class="my-blue">o</span>');

         func = testing.modifyTag( data, ['r', 'o'], true );

     assert.equal( func, expect.innerHTML, 'This actually works in browser with chaining, but here it overwrites the next' );

     done();

  });    

});

describe( '4) Sorting and puns ', function() {

    it(' Splits string into array, sorts it alphabeticily then returns sorted string, and filter all the punctuations', function( done ) {

      data.innerHTML =  'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Poterat autem inpune; Ille incendat? Sed nimis multa. Duo Reges: constructio interrete. Quibusnam praeteritis? Audeo dicere, inquit. Polycratem Samium felicem appellabant.';
      
      var func = testing.puns( data.innerHTML );

      var comp = data.innerHTML
                 .split(' ')
                 .sort( function( a, b ) { return a.localeCompare( b ); })
                 .join(' ')
                 .replace( new RegExp(/[^(a-zA-Z0-9)]/, 'gim'), ' '); 

     assert.equal( func, comp );

      done();

  });    


});
