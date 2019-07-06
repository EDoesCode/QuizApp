<?php
// required headers
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
 
// include database and object files
include_once '../config/database.php';
include_once '../objects/exams.php';
 
// instantiate database and exams object
$database = new Database();
$db = $database->getConnection();

// initialize object
$exams = new Exams($db);

// query exams
$stmt = $exams->read();
$num = $stmt->rowCount();

// check if more than 0 record found
if($num>0){
 
    // exams array
    $exams_arr=array();
    $exams_arr["records"]=array();
 
    // retrieve our table contents
    // fetch() is faster than fetchAll()
    while ($row = $stmt->fetch(PDO::FETCH_ASSOC)){
        // extract row
        // this will make $row['name'] to
        // just $name only
        extract($row);
 
        $exams_item=array(
            "id" => $id,
            "name" => $name,
            "opens" => $opens,
            "closes" => $closes
        );
 
        array_push($exams_arr["records"], $exams_item);
    }
 
    // set response code - 200 OK
    http_response_code(200);
 
    // show products data in json format
    echo json_encode($exams_arr);
} else {
 
  // set response code - 404 Not found
  http_response_code(404);

  // tell the user no exams found
  echo json_encode(
      array("message" => "No exams found.")
  );
}