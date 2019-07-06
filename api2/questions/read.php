<?php
// required headers
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
 
// include database and object files
include_once '../config/database.php';
include_once '../objects/questions.php';
 
// instantiate database and questions object
$database = new Database();
$db = $database->getConnection();

// initialize object
$questions = new Questions($db);

// query questions
$stmt = $questions->read();
$num = $stmt->rowCount();

// check if more than 0 record found
if($num>0){
 
    // questions array
    $questions_arr=array();
    $questions_arr["records"]=array();
 
    // retrieve our table contents
    // fetch() is faster than fetchAll()
    while ($row = $stmt->fetch(PDO::FETCH_ASSOC)){
        // extract row
        // this will make $row['name'] to
        // just $name only
        extract($row);
 
        $questions_item=array(
            "id" => $id,
            "question" => $question,
            "a" => $a,
            "b" => $b,
            "c" => $c,
            "d" => $d,
            "e" => $e,
            "answer" => $answer,
            "numberchoices" => $numberchoices
        );
 
        array_push($questions_arr["records"], $questions_item);
    }
 
    // set response code - 200 OK
    http_response_code(200);
 
    // show products data in json format
    echo json_encode($questions_arr);
} else {
 
  // set response code - 404 Not found
  http_response_code(404);

  // tell the user no questions found
  echo json_encode(
      array("message" => "No questions found.")
  );
}