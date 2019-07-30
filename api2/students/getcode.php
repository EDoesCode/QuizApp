<?php
// Start a session
session_start();
$_SESSION["email"] = "";
$_SESSION["challgenge"] = "";

// required headers
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
 
// include database and object files
include_once '../config/database.php';
include_once '../objects/students.php';

// instantiate database and students object
$database = new Database();
$db = $database->getConnection();
 
// initialize object
$students = new Students($db);
 
// get posted data
$data = json_decode(file_get_contents("php://input"));

// make sure data is not empty
if( !empty($data->email) ) {
 
    // set students property values
    $students->email = $data->email;

    // create the students
    if($students->checkemailexists()){
        // set response code - 503 service unavailable
        http_response_code(503);

        // tell the user
        echo json_encode(array("message" => "Unable to generate verification code. Could be duplicate email address."));
    } else {
      // Email address not already there. Send challenge
      $challenge = mt_rand(100000, 999999);
      $_SESSION["email"] = $students->email;
      $_SESSION["challenge"] = $challenge;
      $emailmsg = "Your verification code is: " . $challenge;
      mail($students->email, "Quiz App Email Verification", $emailmsg);

      // set response code - 200 OK
      http_response_code(200);

      // Package object since mobile doesnt do session variables
      $obj = (object) [
        'email' => $students->email,
        'challenge' => $challenge,
        'message' => 'Verification code sent to email address.'
      ];

      // tell the user
      // echo json_encode(array("message" => "Verification code sent to email address."));
      echo json_encode($obj);
    }
} else {
 
    // set response code - 400 bad request
    http_response_code(400);
 
    // tell the user
    echo json_encode(array("message" => "Unable to generate verification code. Data is incomplete."));
}
?>