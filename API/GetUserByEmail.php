<?php
	// include database connection file
	include "dbConfig.php";
	include "returnFunctions.php";

	$inData = getRequestInfo();

	$stmt = $conn->prepare("SELECT * FROM faculty WHERE email=?");
	$stmt->bind_param("s", $inData["email"]);
	$stmt->execute();

	$result = $stmt->get_result();
	$row = $result->fetch_assoc();

    if(!is_null($row)) {
        // fid not needed, recyling existing functions
        returnLoginInfo( $row['fid'], $row['isStaff'] );
    } else {
        returnWithError("No account for this email exists");
    }

	$stmt->close();
	$conn->close();
?>