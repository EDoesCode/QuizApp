<?php
// required headers
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
 
// include database and object files
include_once '../config/database.php';
include_once '../objects/questions2exams.php';

// instantiate database and students object
$database = new Database();
$db = $database->getConnection();
 
// initialize object
$questions2exams = new Questions2Exams($db);
 
// get posted data
$data = json_decode(file_get_contents("php://input"));

// make sure data is not empty
if(
    !empty($data->questionsid) &&
    !empty($data->examsid)
){
 
    // set students property values
    $questions2exams->questionsid = $data->questionsid;
    $questions2exams->examsid = $data->examsid;

    // Delete the student
    if($questions2exams->delete()){
 
        // set response code - 201 created
        http_response_code(200);
 
        // tell the user
        echo json_encode(array("message" => "Question was deleted from exam."));
    }else{
 
        // set response code - 503 service unavailable
        http_response_code(503);
 
        // tell the user
        echo json_encode(array("message" => "Delete failed. Question was not assigned to exam."));
    }
} else {
 
    // set response code - 400 bad request
    http_response_code(400);
 
    // tell the user
    echo json_encode(array("message" => "Data is incomplete."));
}
?>