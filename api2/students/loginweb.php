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
$students->email = $data->email;
$students->password = $data->password;


// query students
$stmt = $students->loginWeb();
$num = $stmt->rowCount();

// file_put_contents("debug2.txt", "Im here", FILE_APPEND); 

// check if more than 0 record found
if($num>0){
    // Can only be 0 or 1 row
    $row = $stmt->fetch(PDO::FETCH_ASSOC);
 
    // set response code - 200 OK
    http_response_code(200);
 
    // show login data in json format
    echo json_encode($row);
} else {
 
  // set response code - 404 Not found
  http_response_code(404);

  // tell the user no students found
  echo json_encode(
      array("message" => "Invalid username or password.")
  );
}