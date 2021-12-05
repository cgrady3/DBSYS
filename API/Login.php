<?php
	// include database connection file
	include "dbConfig.php";
	include "returnFunctions.php";

	$inData = getRequestInfo();

	$stmt = $conn->prepare("SELECT * FROM faculty WHERE email=? AND password=?");
	$stmt->bind_param("ss", $inData["email"], $inData["password"]);
	$stmt->execute();

	$result = $stmt->get_result();
	$row = $result->fetch_assoc();

	if(!is_null($row))
	{
		returnWithInfo( $row['fid'], $row['isProf'] );
	}
	else
	{
		returnWithError("User Name / Password do not match OR user does not exist");
	}

	$stmt->close();
	$conn->close();


?>
