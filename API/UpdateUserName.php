<?php
	// include database connection file
	include "dbConfig.php";
	include "returnFunctions.php";

	error_reporting(E_ALL);
	ini_set('display_errors', 'on');
	
	$inData = getRequestInfo();

	$stmt = $conn->prepare("UPDATE faculty SET name=? WHERE fid=?");
	$stmt->bind_param("ss", $inData["name"], $inData["fid"]);

	$stmt->execute();

	returnWithInfo($stmt->affected_rows);

	$stmt->close();
	$conn->close();
?>