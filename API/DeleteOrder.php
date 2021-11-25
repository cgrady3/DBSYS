<?php
	// include database connection file
	include "dbConfig.php";
	include "returnFunctions.php";

	$inData = getRequestInfo();

	$stmt = $conn->prepare("DELETE FROM order WHERE fid=? AND cid=? AND isbn=? AND semester=?");
	$stmt->bind_param("iiis", $inData["fid"], $inData["cid"], $inData["isbn"], $inData["semester"]);
	$stmt->execute();

	returnWithInfo($stmt->affected_rows);

	$stmt->close();
	$conn->close();
?>
