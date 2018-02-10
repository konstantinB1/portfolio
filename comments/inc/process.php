<?php

require_once 'db.php';

    function escape( $string ) {
    	return htmlentities( $string, ENT_QUOTES );
    }


 	if ( isset( $_GET[ 'action' ] ) && $_GET[ 'action' ] === 'submit' ) {

 		$name = htmlentities( $_POST[ 'name' ] );
 		$msg  = htmlentities( $_POST[ 'message' ] );

	 	if ( $name !== '' && $msg !== '' && strlen( $name ) > 4 && strlen( $msg ) > 4 ) {

	 		echo 'success';
	        add( [ 'name' => escape( $_POST[ 'name' ] ), 'message' => escape( $_POST[ 'message' ] ) ] );

	 	}

	}

    if ( isset ( $_GET[ 'posts' ] ) ) {

    	$posts = $_GET[ 'posts' ];

	    if ( $posts ==  'all' ) {
		     print( json_encode( fetchAll() ) );	    	
	    }

	    if ( $posts ==  'last-added' ) {
	        print( json_encode( fetchLast() ) );
	    }

	    if ( $posts === 'delete-all' ) {
	    	delete( null, true );
	    	echo 'allgone';
	    }

	    if ( $posts == 'delete' && is_numeric( $_GET[ 'id' ] ) ) {

            $id = $_GET[ 'id' ];

	    	delete( [ $id ] );
	    	echo 'comgone';
	    }	    

    }


?>