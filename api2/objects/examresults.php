<?php
class ExamResults{
 
    // database connection and table name
    private $conn;
    private $table_name = "examresults";
 
    // object properties
    public $id;
    public $examsid;
    public $studentsid;
    public $questionsid;
    public $answered;
 
    // constructor with $db as database connection
    public function __construct($db){
        $this->conn = $db;
    }

    // Add exam results
    function create(){
    
      // query to insert record
      $query = "INSERT INTO examresults SET examsid=:examsid, questionsid=:questionsid, studentsid=:studentsid, answered=:answered";
  
      // prepare query
      $stmt = $this->conn->prepare($query);
  
      // sanitize
      $this->examsid=htmlspecialchars(strip_tags($this->examsid));
      $this->questionsid=htmlspecialchars(strip_tags($this->questionsid));
      $this->studentsid=htmlspecialchars(strip_tags($this->studentsid));
      $this->answered=htmlspecialchars(strip_tags($this->answered));
  
      // bind values
      $stmt->bindParam(":examsid", $this->examsid);
      $stmt->bindParam(":questionsid", $this->questionsid);
      $stmt->bindParam(":studentsid", $this->studentsid);
      $stmt->bindParam(":answered", $this->answered);
  
      // execute query
      if($stmt->execute()){
          return true;
      }
  
      return false; 
    }

    // Get exam score
    function getScore(){
      $query = "select (select count(*) from examresults where examsid = :examsid and studentsid = :studentsid and correct = answered)
                     / (select count(*) from examresults where examsid = :examsid and studentsid = :studentsid) as Score   
                from examresults limit 1;";
  
      // prepare query statement
      $stmt = $this->conn->prepare($query);
      
      // Sanitize and bind
      $this->examsid=htmlspecialchars(strip_tags($this->examsid));
      $this->studentsid=htmlspecialchars(strip_tags($this->studentsid));
      $stmt->bindParam(":examsid", $this->examsid);
      $stmt->bindParam(":studentsid", $this->studentsid);
  
      // execute query
      $stmt->execute();
      
      return $stmt;
    }

}