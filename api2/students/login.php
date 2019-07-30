<?php
// required headers
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
 
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
$stmt = $students->login();
$num = $stmt->rowCount();

// check if more than 0 record found
if($num>0){
 
    // students array
    $students_arr=array();
    $students_arr["records"]=array();
 
    // retrieve our table contents
    // fetch() is faster than fetchAll()
    while ($row = $stmt->fetch(PDO::FETCH_ASSOC)){
        // extract row
        // this will make $row['name'] to
        // just $name only
        extract($row);
 
        $students_item=array(
            "id" => $id,
            "name" => $name,
            "opens" => $opens,
            "closes" => $closes,
            "studentsid" => $studentsid
        );
 
        array_push($students_arr["records"], $students_item);
    }
 
    // set response code - 200 OK
    http_response_code(200);
 
    // show products data in json format
    echo json_encode($students_arr);
} else {
 
  // set response code - 404 Not found
  http_response_code(200);

  // tell the user no students found
  //   echo json_encode(
  //       array("message" => "Invalid username or password.")
  //   );
  echo '{ "records": [ {} ] }';
}