<?php
	// include database connection file
	include "dbConfig.php";
	include "returnFunctions.php";

	// error_reporting(E_ALL);
	// ini_set('display_errors', 'on');

	$inData = getRequestInfo();

	$stmt = $conn->prepare("SELECT * FROM orders WHERE semester=? ORDER BY fid");
	$stmt->bind_param("s", $inData["semester"]);
	$stmt->execute();

	$result = $stmt->get_result();
	$rows = array();

  	if ($result->num_rows > 0) {
		while($row = $result->fetch_assoc()){
			$rows[] = $row;
		}
		echo json_encode($rows);
  	}
    	else {
		returnWithError("No Orders Found for this Semester");
  	}

	$stmt->close();
	$conn->close();
?>
