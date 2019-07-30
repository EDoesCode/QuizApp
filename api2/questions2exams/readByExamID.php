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
 
// get database connection
$database = new Database();
$db = $database->getConnection();
 
// prepare students object
$questions2exams = new Questions2Exams($db);
 
// get id of students to be edited
$data = json_decode(file_get_contents("php://input"));
 
// set students property values
$questions2exams->examsid = $data->examsid;

// query students
$stmt = $questions2exams->readByExamID();
$num = $stmt->rowCount();

// file_put_contents("debug1.txt", $num);

// check if more than 0 record found
if($num>0){
 
    // students array
    $quest2exams_arr=array();
    $quest2exams_arr["records"]=array();
 
    // retrieve our table contents
    // fetch() is faster than fetchAll()
    while ($row = $stmt->fetch(PDO::FETCH_ASSOC)){
        // extract row
        // this will make $row['name'] to
        // just $name only
        extract($row);

        $quest2exams_item=array(
            "examsid" => $examsid,
            "questionsid" => $questionsid,
            "question" => $question,
            "a" => $a,
            "b" => $b,
            "c" => $c,
            "d" => $d,
            "e" => $e,
            "numberchoices" => $numberchoices
        );
 
        array_push($quest2exams_arr["records"], $quest2exams_item);
    }
 
    // set response code - 200 OK
    http_response_code(200);
 
    // show data in json format
    echo json_encode($quest2exams_arr);
} else {
 
  // set response code - 404 Not found
  http_response_code(404);

  // tell the user no exams found
  echo json_encode(
      array("message" => "No questions found for given exam.")
  );
}
?>