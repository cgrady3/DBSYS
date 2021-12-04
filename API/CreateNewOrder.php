<?php
	// include database connection file
	include "dbConfig.php";
	include "returnFunctions.php";

	$inData = getRequestInfo();

	// if this order already exists, delete it, we'll create a new one
	$stmt = $conn->prepare("DELETE FROM orders WHERE uniqueID=?");
	$stmt->bind_param("s", $inData["uniqueID"]);
	$stmt->execute();

	
	$stmt = $conn->prepare("INSERT INTO orders (fid, cid, semester, isbn, orderBy, title, author, edition, publisher) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)");
	$stmt->bind_param("iisidsssis", $inData["fid"], $inData["cid"], $inData["semester"], $inData["isbn"], $inData["orderBy"], $inData["semester"], $inData["title"], $inData["author"], $inData["edition"], $inData["publisher"], $inData["uniqueID"]);
	$stmt->execute();

	returnWithInfo($stmt->affected_rows);
	
	$stmt->close();
	$conn->close();
?>
