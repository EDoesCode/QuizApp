<?php
// required headers
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
 
// include database and object files
include_once '../config/database.php';
include_once '../objects/questions.php';

// instantiate database and questions object
$database = new Database();
$db = $database->getConnection();
 
// initialize object
$questions = new Questions($db);
 
// get posted data
$data = json_decode(file_get_contents("php://input"));

// make sure data is not empty
if(
    !empty($data->question) &&
    !empty($data->a) &&
    !empty($data->b) &&
    !empty($data->answer) &&
    !empty($data->numberchoices)

){
 
    // set questions property values
    $questions->question = $data->question;
    $questions->a = $data->a;
    $questions->b = $data->b;
    $questions->c = $data->c;
    $questions->d = $data->d;
    $questions->e = $data->e;
    $questions->answer = $data->answer;
    $questions->numberchoices = $data->numberchoices;

    // create the questions
    if($questions->create()){
 
        // set response code - 201 created
        http_response_code(201);
 
        // tell the user
        echo json_encode(array("message" => "Question was created."));
    }
 
    // if unable to create the questions, tell the user
    else{
 
        // set response code - 503 service unavailable
        http_response_code(503);
 
        // tell the user
        echo json_encode(array("message" => "Unable to create question."));
    }
} else {
 
    // set response code - 400 bad request
    http_response_code(400);
 
    // tell the user
    echo json_encode(array("message" => "Unable to create question. Data is incomplete. Questions must have at least two answers."));
}
?>