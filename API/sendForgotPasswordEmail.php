<?php

error_reporting(E_ALL);
ini_set('display_errors', 'on');

	$to			= $inData["email"];
	$subject	= 'Reset Password';
	$message 	= $inData["message"];
	$headers	= 'From: group25@databases.com'			. "\r\n" .
					'Reply-To: group25@databases.com'	. "\r\n" .
					'X-Mailer: PHP/' . phpversion();

	mail($to, $subject, $message, $headers);
?>