<?php
	// config db 
	$dbHost     = "db-mysql-nyc3-24748-do-user-10242737-"; 
	$dbUsername = "doadmin"; 
	$dbPassword = "YdnsPnEEPp1TBo1k "; 
	$dbName     = "DB systems"; 
	 
	// establish db connection 
	$conn = new mysqli($dbHost, $dbUsername, $dbPassword, $dbName); 
	 
	// Check connection 
	if( $conn->connect_error )
	{
		returnWithError( $conn->connect_error );
	}
?>