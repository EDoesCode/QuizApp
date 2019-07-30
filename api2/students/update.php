<?php
// required headers
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST,PUT");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
 
// include database and object files
include_once '../config/database.php';
include_once '../objects/students.php';
 
// get database connection
$database = new Database();
$db = $database->getConnection();
 
// prepare students object
$students = new Students($db);
 
// get id of students to be edited
$data = json_decode(file_get_contents("php://input"));
 
// set students property values
$students->id = $data->id;
$students->firstname = $data->firstname;
$students->lastname = $data->lastname;
$students->email = $data->email;
$students->password = $data->password;
$students->isAdmin = $data->isAdmin;
$students->challenge = $data->challenge;
$students->verified = $data->verified;
 
// update the students
if($students->update()){
 
    // set response code - 200 ok
    http_response_code(200);
 
    // tell the user
    echo json_encode(array("message" => "Student was updated."));
}
 
// if unable to update the students, tell the user
else{
 
    // set response code - 503 service unavailable
    http_response_code(503);
 
    // tell the user
    echo json_encode(array("message" => "Unable to update students. You cannot update the email address if that address has already been used."));
}
?>