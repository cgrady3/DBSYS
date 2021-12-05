<?php
	// include database connection file
	include "dbConfig.php";
	include "returnFunctions.php";

	$inData = getRequestInfo();

	$stmt = $conn->prepare("SELECT * FROM Users WHERE fid=?");
	$stmt->bind_param("s", $inData["fid"]);
	$stmt->execute();

	$row = $stmt->get_result();
	echo json_encode($row->fetch_assoc());

	$stmt->close();
	$conn->close();
?>