<?php
    // include database connection file
	include "dbConfig.php";
	include "returnFunctions.php";
	
	// include database connection file
	include "dbConfig.php";
	include "returnFunctions.php";

	$inData = getRequestInfo();

	$stmt = $conn->prepare("SELECT email FROM faculty where isStaff=1");
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
		returnWithError("No emails Found");
  	}

	$stmt->close();
	$conn->close();

?>