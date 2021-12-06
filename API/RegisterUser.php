<?php
	header('Access-Control-Allow-Origin: *');
	header("Access-Control-Allow-Methods: GET, POST, OPTIONS, PUT, DELETE");
	header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, X-Requested-With");
	
	include database connection file
	include "dbConfig.php";

	//error_reporting(E_ALL);
	//ini_set('display_errors', 'on');

	$inData = getRequestInfo();

	$stmt = $conn->prepare("SELECT * FROM faculty WHERE email=?");
	$stmt->bind_param("s", $inData["email"]);
	$stmt->execute();

	$result = $stmt->get_result();
	$stmt->reset();

	if ($result->num_rows > 0){
		returnWithError("Faculty Account Already Exists");
	}
	else{
		$stmt = $conn->prepare("INSERT INTO faculty (name, email, password, isStaff) VALUES(?, ?, ?, ?)");
		$stmt->bind_param("sssi",  $inData["name"], $inData["email"], $inData["password"], $inData["isStaff"]);
		$stmt->execute();

		$stmt = $conn->prepare("SELECT * FROM faculty WHERE email=?");
		$stmt->bind_param("s", $inData["email"]);
		$stmt->execute();

		$result = $stmt->get_result();
		//if($result->fetch_assoc() == false){
		 	//$result = $conn->query($sql);
		//}
		//else{
			//echo json_encode($result->fetch_assoc());
		//}
		echo json_encode($result->fetch_assoc());
	}

	$stmt->close();
	$conn->close();
?>
