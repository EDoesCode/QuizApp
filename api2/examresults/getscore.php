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
include_once '../objects/students2exams.php';
 
// instantiate database and students object
$database = new Database();
$db = $database->getConnection();

// initialize object
$examresults = new ExamResults($db);

// get posted data
$data = json_decode(file_get_contents("php://input"));
$examresults->studentsid = $data->studentsid;
$examresults->examsid = $data->examsid;


// query students
$stmt = $examresults->getScore();
$num = $stmt->rowCount();

// file_put_contents("debug2.txt", "Im here", FILE_APPEND); 

// check if more than 0 record found
if($num>0){
    // Can only be 0 or 1 row
    $row = $stmt->fetch(PDO::FETCH_ASSOC);
 
    $students2exams = new Students2Exams($db);
    $students2exams->examsid = $data->examsid;
    $students2exams->studentsid = $data->studentsid;
    $students2exams->taken = 1;
    $students2exams->score = $row["Score"];
    
    $students2exams->enterScore();

    // set response code - 200 OK
    http_response_code(200);
 
    // show login data in json format
    echo json_encode($row);
} else {
 
  // set response code - 404 Not found
  http_response_code(404);

  // tell the user no students found
  echo json_encode(
      array("message" => "Unable to get score.")
  );
}