<?php
	header('Access-Control-Allow-Origin: *');
	header("Access-Control-Allow-Methods: GET, POST, OPTIONS, PUT, DELETE");
	header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, X-Requested-With");

	error_reporting(E_ALL);
	ini_set('display_errors', 'on');

	// config db 
	$dbHost     = "mi3-ss66.a2hosting.com"; 
	$dbUsername = "databa14_doadmin"; 
	$dbPassword = "Fall2021Group25m"; 
	$dbName     = "databa14_group25database"; 
	 
	// establish db connection 
	$conn = new mysqli($dbHost, $dbUsername, $dbPassword, $dbName); 
	 
	// Check connection 
	if( $conn->connect_error )
	{
		returnWithError( $conn->connect_error );
	}
?>