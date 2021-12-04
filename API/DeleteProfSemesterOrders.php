<?php
	// include database connection file
	include "dbConfig.php";
	include "returnFunctions.php";

	$inData = getRequestInfo();

	$stmt = $conn->prepare("DELETE FROM order WHERE fid=? AND semester=?");
	$stmt->bind_param("is", $inData["fid"], $inData["semester"]);
	$stmt->execute();

	returnWithInfo($stmt->affected_rows);

	$stmt->close();
	$conn->close();
?>