<?php
	header('Access-Control-Allow-Origin: *');
	header("Access-Control-Allow-Methods: GET, POST, OPTIONS, PUT, DELETE");
	header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, X-Requested-With");
	
	// include database connection file
	include "dbConfig.php";
	include "returnFunctions.php";

	error_reporting(E_ALL);
	ini_set('display_errors', 'on');

	$inData = getRequestInfo();

	$stmt = $conn->prepare("SELECT * FROM faculty WHERE email=? AND password=?");
	$stmt->bind_param("ss", $inData["email"], $inData["password"]);
	$stmt->execute();

	$result = $stmt->get_result();
	$row = $result->fetch_assoc();

	if(!is_null($row))
	{
		returnLoginInfo( $row['fid'], $row['isStaff'] );
	}
	else
	{
		returnWithError("User Name / Password do not match OR user does not exist");
	}

	$stmt->close();
	$conn->close();


?>
