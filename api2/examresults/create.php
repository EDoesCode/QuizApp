<?php
// required headers
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
 
// include database and object files
include_once '../config/database.php';
include_once '../objects/examresults.php';

// instantiate database and students object
$database = new Database();
$db = $database->getConnection();
 
// initialize object
$examresults = new ExamResults($db);
 
// get posted data
$data = json_decode(file_get_contents("php://input"));

// make sure data is not empty
if(
    !empty($data->questionsid) &&
    !empty($data->examsid) &&
    !empty($data->studentsid)
){
 
    // set students property values
    $examresults->questionsid = $data->questionsid;
    $examresults->examsid = $data->examsid;
    $examresults->studentsid = $data->studentsid;
    $examresults->answered = $data->answered;

    // create the students
    if($examresults->create()){
 
        // set response code - 201 created
        http_response_code(201);
 
        // tell the user
        echo json_encode(array("message" => "Exam result was entered."));
    }else{
 
        // set response code - 503 service unavailable
        http_response_code(503);
 
        // tell the user
        echo json_encode(array("message" => "Create failed. Question-Exam-Student must already exist. Could be duplicate data."));
    }
} else {
 
    // set response code - 400 bad request
    http_response_code(400);
 
    // tell the user
    echo json_encode(array("message" => "Data is incomplete."));
}
?>