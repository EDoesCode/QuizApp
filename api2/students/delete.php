<?php
// required headers
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST,DELETE");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
 
// include database and object file
include_once '../config/database.php';
include_once '../objects/students.php';
 
// get database connection
$database = new Database();
$db = $database->getConnection();
 
// prepare students object
$students = new Students($db);
 
// get students id
$data = json_decode(file_get_contents("php://input"));
 
// Validate required fields
if( $data->id == null) {
   http_response_code(404);
   echo json_encode(array("message" => "Missing required data."));
   exit();
}


// set students id to be deleted
$students->id = $data->id;
 
// delete the students
if($students->delete()){
 
    // set response code - 200 ok
    http_response_code(200);
 
    // tell the user
    echo json_encode(array("message" => "Student was deleted."));
}
 
// if unable to delete the students
else{
 
    // set response code - 503 service unavailable
    http_response_code(503);
 
    // tell the user
    echo json_encode(array("message" => "Unable to delete student. You cannot delete a student assigned to an exam or that has exam history."));
}
?>