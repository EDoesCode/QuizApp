<?php
  // required headers
  header("Access-Control-Allow-Origin: *");
  header("Content-Type: application/json; charset=UTF-8");
  header("Access-Control-Allow-Methods: POST,PUT");
  header("Access-Control-Max-Age: 3600");
  header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
  
  // include database and object files
  include_once '../config/database.php';
  include_once '../objects/questions.php';
  
  // get database connection
  $database = new Database();
  $db = $database->getConnection();
  
  // prepare questions object
  $questions = new Questions($db);
  
  // get id of questions to be edited
  $data = json_decode(file_get_contents("php://input"));
  
  // set questions property values
  $questions->id = $data->id;
  $questions->question = $data->question;
  $questions->a = $data->a;
  $questions->b = $data->b;
  $questions->c = $data->c;
  $questions->d = $data->d;
  $questions->e = $data->e;
  $questions->answer = $data->answer;
  $questions->numberchoices = $data->numberchoices;
  
  // update the questions
  if($questions->update()){
  
      // set response code - 200 ok
      http_response_code(200);
  
      // tell the user
      echo json_encode(array("message" => "Question was updated."));
  }
  
  // if unable to update the questions, tell the user
  else{
  
      // set response code - 503 service unavailable
      http_response_code(503);
  
      // tell the user
      echo json_encode(array("message" => "Unable to update question."));
  }
?>