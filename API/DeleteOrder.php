<?php
	// include database connection file
	include "dbConfig.php";
	include "returnFunctions.php";
	
	$inData = getRequestInfo();

	$stmt = $conn->prepare("DELETE FROM orders WHERE uniqueID=?");
	$stmt->bind_param("s", $inData["uniqueID"]);
	$stmt->execute();

	returnWithInfo($stmt->affected_rows);

	$stmt->close();
	$conn->close();
?>
