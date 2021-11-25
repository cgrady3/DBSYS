<?php
	// include database connection file
	include "dbConfig.php";
	include "returnFunctions.php";

	$inData = getRequestInfo();
	
	// check if order for this class from this teacher for this book already exists for this semester/year
	$stmt = $conn->prepare("SELECT * FROM orders WHERE fid=? AND cid=? AND isbn=? AND semester=?");
	$stmt->bind_param("iii", $inData["fid"], $inData["cid"], $inData["isbn"], $inData["semester"]);
	$stmt->execute();

	$result = $stmt->get_result();
	
	// if the order exists return error
	// else insert the order to db
	if ($result->num_rows > 0){
		returnWithError("Order Already Exists");
	}
	else{
		$stmt = $conn->prepare("INSERT INTO orders (fid, cid, isbn, orderBy, semester, title, author, edition, publisher) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)");
		$stmt->bind_param("iiidsssis", $inData["fid"], $inData["cid"], $inData["isbn"], $inData["orderBy"], $inData["semester"], $inData["title"], $inData["author"], $inData["edition"], $inData["publisher"]);
		$stmt->execute();

		returnWithInfo($stmt->affected_rows);
	}
	
	$stmt->close();
	$conn->close();
?>
