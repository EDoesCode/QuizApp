<?php
// required headers
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
 
// include database and object files
include_once '../config/database.php';
include_once '../objects/exams.php';

// instantiate database and exams object
$database = new Database();
$db = $database->getConnection();
 
// initialize object
$exams = new Exams($db);
 
// get posted data
$data = json_decode(file_get_contents("php://input"));

// make sure data is not empty
if(
    !empty($data->name) &&
    !empty($data->opens) &&
    !empty($data->closes)
){
 
    // set exams property values
    $exams->name = $data->name;
    $exams->opens = $data->opens;
    $exams->closes = $data->closes;

    // create the exams
    if($exams->create()){
 
        // set response code - 201 created
        http_response_code(201);
 
        // tell the user
        echo json_encode(array("message" => "Exam was created."));
    }
 
    // if unable to create the exams, tell the user
    else{
 
        // set response code - 503 service unavailable
        http_response_code(503);
 
        // tell the user
        echo json_encode(array("message" => "Unable to create exam."));
    }
} else {
 
    // set response code - 400 bad request
    http_response_code(400);
 
    // tell the user
    echo json_encode(array("message" => "Unable to create exam. Data is incomplete."));
}
?>