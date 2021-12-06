<?php
	// include database connection file
	//include "dbConfig.php";
	//include "returnFunctions.php";
	include "A2HostingDBConfig.php";
	include "returnFunctions.php";

	$inData = getRequestInfo();

	$stmt = $conn->prepare("SELECT * FROM order WHERE fid=? AND semester=? ORDER BY cid");
	$stmt->bind_param("is", $inData["fid"], $inData["semester"]);
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
		returnWithError("No Orders Found");
  	}

	$stmt->close();
	$conn->close();
?>
