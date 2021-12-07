<?php
	// include database connection file
	include "dbConfig.php";
	include "returnFunctions.php";

	error_reporting(E_ALL);
	ini_set('display_errors', 'on');
	
	$inData = getRequestInfo();

	$stmt = $conn->prepare("UPDATE faculty SET password=? WHERE fid=?");
	$stmt->bind_param("ss", $inData["password"], $inData["fid"]);

	$stmt->execute();

	returnWithInfo($stmt->affected_rows);

	$stmt->close();
	$conn->close();
?>