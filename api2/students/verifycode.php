<?php
// Start a session
session_start();

// required headers
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

// get posted data
$data = json_decode(file_get_contents("php://input"));

// make sure data is not empty
if( !empty($data->email) && !empty($data->challenge) ) {
  if ( $data->email = $_SESSION["email"] && $data->challenge = $_SESSION["challenge"] ) {
      // set response code - 200 OK
      http_response_code(200);
      // tell the user
      echo json_encode(array("message" => "Email verified."));
  } else {
        // set response code - 400 bad request
        http_response_code(400);
        // tell the user
        echo json_encode(array("message" => "Verification code incorrect."));      
  }
} else {

  // set response code - 400 bad request
  http_response_code(400);

  // tell the user
  echo json_encode(array("message" => "Unable to generate verification code. Data is incomplete."));
}

?>