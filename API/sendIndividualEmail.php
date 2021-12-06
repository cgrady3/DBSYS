<?php
//     // include database connection file
// 	include "dbConfig.php";
// 	include "returnFunctions.php";

//     //$url = 'https://api.elasticemail.com/v2/email/send';
    

//     try{
//         $post = array('from' => 'databasesgroup25project@gmail.com',
// 		'fromName' => 'Book Order Store',
// 		'apikey' => '0A1309CD9BAD69497F71B994C627612E2444E7EF4DE31399F498E17EE672C46B2121D81FF147F339C291D2D4D77E93B1',
// 		'subject' => 'Book Order Reminder',
// 		'to' => 'ericsayegh1@gmail.com;databasesgroup25project@gmail.com',
// 		'bodyHtml' => '<h1>Html Body</h1>',
// 		'bodyText' => 'This is a test',
// 		'isTransactional' => false);
		
// 		$ch = curl_init();
// 		curl_setopt_array($ch, array(
//             CURLOPT_URL => $url,
// 			CURLOPT_POST => true,
// 			CURLOPT_POSTFIELDS => $post,
//             CURLOPT_RETURNTRANSFER => true,
//             CURLOPT_HEADER => false,
// 			CURLOPT_SSL_VERIFYPEER => false
//         ));
		
//         $result=curl_exec ($ch);
//         curl_close ($ch);
		
//         echo $result;	
// }
// catch(Exception $ex){
// 	echo $ex->getMessage();
// }

	$to			= 'maximilliangomer@gmail.com';
	$subject	= 'test email';
	$message 	= 'testing!';
	$headers	= 'From: group25@databases.com'			. "\r\n" .
					'Reply-To: group25@databases.com'	. "\r\n" .
					'X-Mailer: PHP/' . phpversion();

	mail($to, $subject, $message, $headers);
?>