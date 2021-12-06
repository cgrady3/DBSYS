<?php
	// (header('Access-Control-Allow-Origin: *');
	// header("Access-Control-Allow-Methods: GET, POST, OPTIONS, PUT, DELETE");
	// heade"Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, X-Requested-With");

	// config db 
	$dbHost     = "localhost"; 
	$dbUsername = "TheBeast"; 
	$dbPassword = "WeLoveCOP4710"; 
	$dbName     = "COP4710"; 
	 
	// establish db connection 
	$conn = new mysqli($dbHost, $dbUsername, $dbPassword, $dbName); 
	 
	// Check connection 
	if( $conn->connect_error )
	{
		returnWithError( $conn->connect_error );
	}
?>