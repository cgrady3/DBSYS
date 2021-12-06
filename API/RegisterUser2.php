<?php
header('Access-Control-Allow-Origin: *');
header("Access-Control-Allow-Methods: GET, POST, OPTIONS, PUT, DELETE");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, X-Requested-With");
    $inData = getRequestInfo();

    /*$id = 0;
    $login = $inData['login'];
    $password = $inData['password'];
    $firstName = $inData['firstName'];
    $lastName = $inData['lastName'];
    $dateCreated = "";
    $dateLastLoggedIn = "";


*/

    // Connect to the sqlServer '$databaseName' on 'localhost' with the username '$databaseUser'
    // and the password '$databasePassword

    $dbHost     = "mi3-ss66.a2hosting.com"; 
	$dbUsername = "databa14_doadmin"; 
	$dbPassword = "Fall2021Group25m"; 
	$dbName     = "databa14_group25database"; 
	 
	// establish db connection 
	$conn = new mysqli($dbHost, $dbUsername, $dbPassword, $dbName); 
	 
	// Check connection 
	if( $conn->connect_error )
	{
		returnWithError( $conn->connect_error );
	}
    // make the user if connection was successful
    else
    {
        // Set the date created!
        // EDIT: This is not needed, I'm dumb
        // we set up the sqlserver so that it auto sets date created.
        //$dateCreated = date("Y-m-d H:i:s");
        //$dateLastLoggedIn = $dateCreated;
        // Prepare a SQL command to send to the server!

        //$stmt = $conn->prepare("SELECT MAX(ID) FROM Users");

        $stmt = $conn->prepare("INSERT INTO faculty (name, email, password, isStaff) VALUES (?,?,?,?)");
        // Now let's bind our variables to those ?s in the above line
        $stmt->bind_param("ssss", $inData["name"], $inData["email"], $inData["password"], $inData["isStaff"]);
        // Send the now prepared command!
        $stmt->execute();



        // Close the connection
		$stmt->close();
		$conn->close();
        returnWithError("");
    } 
	function returnWithError( $err )
	{
		$retValue = '{"error":"' . $err . '"}';
		sendResultInfoAsJson( $retValue );
	}
    function getRequestInfo()
    {
        return json_decode(file_get_contents('php://input'), true);
    }

    function sendResultInfoAsJson( $obj )
	{
		header('Content-type: application/json');
		echo $obj;
	}

?>