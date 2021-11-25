
<?php
	// include database connection file
	include "dbConfig.php";
	include "returnFunctions.php";

	$inData = getRequestInfo();

	$stmt = $conn->prepare("SELECT * FROM user WHERE (fid LIKE ? OR FirstName LIKE ? OR LastName LIKE ? OR Email LIKE ? OR FullName LIKE ?) ORDER BY LastName");
	$search = "%". $inData["Search"] . "%";
	$fid = "%". $inData["fid"] . "%";
	$stmt->bind_param("issss", $fid, $search, $search, $search, $search);
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
		returnWithError("No Contact Found");
  	}

	$stmt->close();
	$conn->close();
?>
