<?php
// required headers
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST,DELETE");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
 
// include database and object file
include_once '../config/database.php';
include_once '../objects/questions.php';
 
// get database connection
$database = new Database();
$db = $database->getConnection();
 
// prepare questions object
$questions = new Questions($db);
 
// get questions id
$data = json_decode(file_get_contents("php://input"));

// Validate required fields
if( $data->id == null) {
  http_response_code(404);
  echo json_encode(array("message" => "Missing required data."));
  exit();
}

// set questions id to be deleted
$questions->id = $data->id;
 
// delete the questions
if($questions->delete()){
 
    // set response code - 200 ok
    http_response_code(200);
 
    // tell the user
    echo json_encode(array("message" => "Question was deleted."));
}
 
// if unable to delete the questions
else{
 
    // set response code - 503 service unavailable
    http_response_code(503);
 
    // tell the user
    echo json_encode(array("message" => "Unable to delete question. Question cannot be deleted if assigned to an exam or has exam history."));
}
?>