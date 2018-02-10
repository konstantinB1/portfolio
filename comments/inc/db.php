<?php


function query( $query ) {

	$db = mysqli_connect( 'localhost', 'root', '1', 'it_assigment' );

	if ( mysqli_connect_errno() ) {
		echo 'Connection failed';
		exit;
    }

	return mysqli_query( $db, $query );

}

function iterate( array $data, $action = 'AND' ) {

	$keys   = array_keys( $data );
	$last   = end( $keys );
	$build  = '';

	if ( is_array( $data ) && count( $data ) !== 0 ) {

		foreach ( $data as $field => $value ) {

			$build .= $field . ' = ' . '\'' . $value . '\'';
			if ( count( $data ) === 1 ) { break; }
		    if ( $field !== $last ) { $build .= ' ' . $action . ' '; }

		}

    }

    return $build;

}

function select( $where = null, $order = null,  $limit = null ) {

	$select = 'SELECT * FROM users';

	$wh     =  isset( $where ) || $where !== null  ? ' WHERE ' . iterate( $where ) : '';
	$ord    =  isset( $order ) || $order !== null  ? ' ORDER BY ' . $order : '';
	$lim    =  isset( $limit ) || $limit !== null  ? ' LIMIT ' . $limit : '';

    $return = query( trim($select . $wh . $ord . $lim) );

	return $return;

}

function add( array $data ) {

	$keys         =  array_keys( $data );
	$buildFields  = '';
	$buildVals    = '';

	foreach( $data as $field => $value ) {

		$operator     = ( $field === end( $keys ) ) ? ' ' : ', ';
		$buildFields .= $field . $operator;
		$buildVals   .= '\'' . $value  . '\'' . $operator;

	}

	$query = 'INSERT INTO users (' . $buildFields . ') VALUES ( ' . $buildVals . ' ) ';

	return query( $query );

}

function delete( array $in = null, $truncate = null ) {

    if ( isset( $truncate ) && is_bool( $truncate ) && $truncate ) {
    	return query( 'TRUNCATE users' );
    }

    $delete = 'DELETE FROM users';
 
    if ( isset( $in ) ) {

    	$inToStr = implode( $in, ', ' );
	    $q       = $delete . ' WHERE id IN ( ' . $inToStr . ' )';

	    return query( $q );

    }

    return query( $delete );

}

function rowsCount( $result ) {
	return mysqli_num_rows( $result );
}

function fetchAll( ) {

	$select = select();

	if ( rowsCount( $select ) ) {
		return mysqli_fetch_all( select(), MYSQLI_ASSOC );		
	}
	
}

function fetchLast() {
 
    $select = select( null, 'id DESC', 1);

	if ( rowsCount( $select ) ) {
		return mysqli_fetch_row( $select );		
	}

}