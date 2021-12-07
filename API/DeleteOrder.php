<?php
	// include database connection file
	include "dbConfig.php";
	include "returnFunctions.php";
	
	// error_reporting(E_ALL);
	// ini_set('display_errors', 'on');

	$inData = getRequestInfo();

	$stmt = $conn->prepare("DELETE FROM orders WHERE oid=?");
	$stmt->bind_param("s", $inData["oid"]);
	$stmt->execute();

	returnWithInfo($stmt->affected_rows);

	$stmt->close();
	$conn->close();
?>
