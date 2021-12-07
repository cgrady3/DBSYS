<?php
	// include database connection file
	include "dbConfig.php";
	include "returnFunctions.php";

	// error_reporting(E_ALL);
	// ini_set('display_errors', 'on');

	$inData = getRequestInfo();

	$stmt = $conn->prepare("SELECT * FROM orders WHERE oid=?");
    $stmt->bind_param("i", $inData["oid"]);
	$stmt->execute();

	$row = $stmt->get_result();
	echo json_encode($row->fetch_assoc());

	$stmt->close();
	$conn->close();
?>
