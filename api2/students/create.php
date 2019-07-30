<?php
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
if(
    !empty($data->firstname) &&
    !empty($data->lastname) &&
    !empty($data->email) &&
    !empty($data->password) &&
    !empty($data->challenge)
){
 
    // set students property values
    $students->firstname = $data->firstname;
    $students->lastname = $data->lastname;
    $students->email = $data->email;
    $students->password = $data->password;
    $students->isAdmin = 0;
    $students->challenge = $data->challenge;
    $students->verified = 1;

    // create the students
    if($students->create()){
 
        // set response code - 201 created
        http_response_code(201);
 
        // tell the user
        echo json_encode(array("message" => "student was created."));
    }
 
    // if unable to create the students, tell the user
    else{
 
        // set response code - 503 service unavailable
        http_response_code(503);
 
        // tell the user
        echo json_encode(array("message" => "Unable to create student. Student email cannot already exist."));
    }
} else {
 
    // set response code - 400 bad request
    http_response_code(400);
 
    // tell the user
    echo json_encode(array("message" => "Unable to create student. Data is incomplete."));
}
?>