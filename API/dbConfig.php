<?php
	header('Access-Control-Allow-Origin: *');
	header("Access-Control-Allow-Methods: GET, POST, OPTIONS, PUT, DELETE");
	header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, X-Requested-With");



	// config db 
	$dbHost     = "db-mysql-nyc3-24748-do-user-10242737-0.b.db.ondigitalocean.com"; 
	$dbUsername = "doadmin"; 
	$dbPassword = "YdnsPnEEPp1TBo1k"; 
	$dbName     = "defaultdb"; 
	 
	// establish db connection 
	$conn = new mysqli($dbHost, $dbUsername, $dbPassword, $dbName); 
	 
	// Check connection 
	if( $conn->connect_error )
	{
		returnWithError( $conn->connect_error );
	}
?>