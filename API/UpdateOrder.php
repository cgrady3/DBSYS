<?php
	// include database connection file
	include "dbConfig.php";
	include "returnFunctions.php";

	$inData = getRequestInfo();

	$stmt = $conn->prepare("INSERT INTO orders (fid, cid, isbn, orderBy, semester, title, author, edition, publisher) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)");
	$stmt->bind_param("iiidsssis", $inData["fid"], $inData["cid"], $inData["isbn"], $inData["orderBy"], $inData["semester"], $inData["title"], $inData["author"], $inData["edition"], $inData["publisher"]);

	$stmt->execute();

	returnWithInfo($stmt->affected_rows);

	$stmt->close();
	$conn->close();
?>
