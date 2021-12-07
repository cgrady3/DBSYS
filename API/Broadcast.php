<?php
    // include database connection file
	include "dbConfig.php";
	include "returnFunctions.php";
	

	$inData = getRequestInfo();

	$stmt = $conn->prepare("SELECT * FROM faculty");
	$stmt->execute();

	$result = $stmt->get_result();
	$rows = array();
	$emailList = "";
  	if ($result->num_rows > 0) {
		while($row = $result->fetch_assoc()){
			$rows[] = $row['email'];
			$singleEmail = ','.$row['email'][0]
			$emailList .= $singleEmail

		}
		echo json_encode($emailList);
  	}
    	else {
		returnWithError("No emails Found");
  	}

	$stmt->close();
	$conn->close();

?>