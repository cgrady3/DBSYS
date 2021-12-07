<?php
    // include database connection file
	include "dbConfig.php";
	include "returnFunctions.php";
	
	error_reporting(E_ALL);
	ini_set('display_errors', 'on');

	$inData = getRequestInfo();
    $url = "http://www.databases-group25-project.com";
	
    $stmt = $conn->prepare("SELECT * FROM faculty");
	$stmt->execute();

	$result = $stmt->get_result();
	$rows = array();
	$emailList = '';
    $singleEmail = '';

  	if ($result->num_rows > 0) {
		while($row = $result->fetch_assoc()){
			
            $rows[] = $row['email'];
			$singleEmail = $row['email'].',';
			$emailList .= $singleEmail;

		}
		
  	}
    	else {
		returnWithError("No emails Found");
  	}

	$stmt->close();
	$conn->close();
    $messageString = "Please submit your book request soon! \n";
    $emailList = substr_replace($emailList ,"", -1);

    $to			= $emailList;
	$subject	= 'Book Request Reminder';
	$message 	=  $messageString.$url;
	$headers	= 'From: group25@databases.com'			. "\r\n" .
					'Reply-To: group25@databases.com'	. "\r\n" .
					'X-Mailer: PHP/' . phpversion();

	mail($to, $subject, $message, $headers);
    


    

	
?>