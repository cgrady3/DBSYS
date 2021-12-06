<?php
	// include database connection file
	include "dbConfig.php";
	include "returnFunctions.php";

	$inData = getRequestInfo();

	// if this order already exists, delete it, we'll create a new one
	$stmt = $conn->prepare("DELETE FROM orders WHERE uniqueID=?");
	$stmt->bind_param("s", $inData["uniqueID"]);
	$stmt->execute();

	
	$stmt = $conn->prepare("INSERT INTO orders (oid, fid, cid, semester, title, authors, edition, publisher, isbn, deadline, uniqueID) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)");
	$stmt->bind_param("iissssssds", $inData["oid"] $inData["fid"], $inData["cid"], $inData["semester"], $inData["title"], $inData["authors"], $inData["edition"], $inData["publisher"], $inData["isbn"], $inData["deadline"], $inData["uniqueID"]);
	$stmt->execute();

	returnWithInfo($stmt->affected_rows);
	
	$stmt->close();
	$conn->close();
?>
