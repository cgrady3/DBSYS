<?php
	header('Access-Control-Allow-Origin: *');
	header("Access-Control-Allow-Methods: GET, POST, OPTIONS, PUT, DELETE");
	header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, X-Requested-With");
	
	// include database connection file
	include "dbConfig.php";
	include "returnFunctions.php";

	error_reporting(E_ALL);
	ini_set('display_errors', 'on');

	$inData = getRequestInfo();

	$date = $inData["date"];
	$messageString = "Please submit your book request by the following date \n";
	$url = "\nhttp://www.databases-group25-project.com";



    $to			= $inData["emails"];
	$subject	= 'Book Request Reminder';
	$message 	= $messageString.$date.$url;
	$headers	= 'From: group25@databases.com'			. "\r\n" .
					'Reply-To: group25@databases.com'	. "\r\n" .
					'X-Mailer: PHP/' . phpversion();

	mail($to, $subject, $message, $headers);
?>
