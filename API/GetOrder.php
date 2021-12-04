<?php
	// include database connection file
	include "dbConfig.php";
	include "returnFunctions.php";

	$inData = getRequestInfo();

	$stmt = $conn->prepare("SELECT * FROM order WHERE oid=?");
    $stmt->bind_param("i", $inData["orderID"]);
	$stmt->execute();

	$row = $stmt->get_result();
	echo json_encode($row->fetch_assoc());

	$stmt->close();
	$conn->close();
?>
