<?php
class Students2Exams{
 
    // database connection and table name
    private $conn;
    private $table_name = "students2exams";
 
    // object properties
    public $id;
    public $examsid;
    public $studentsid;
    public $taken;
    public $score;
    
    // constructor with $db as database connection
    public function __construct($db){
        $this->conn = $db;
    }

    // read students
    function read(){

      // select all query
      $query = "SELECT examsid, studentsid, taken, score 
                FROM students2exams";

      // prepare query statement
      $stmt = $this->conn->prepare($query);

      // execute query
      $stmt->execute();

      return $stmt;
    }
    
    // Read all exams by Student ID
    function readByStudentID(){
    
      // select all query
      $query = "SELECT examsid, taken, score 
                FROM students2exams
                WHERE studentsid = :studentsid";

      // prepare query statement
      $stmt = $this->conn->prepare($query);

      // sanitize
      $this->studentsid=htmlspecialchars(strip_tags($this->studentsid));

      // bind values
      $stmt->bindParam(":studentsid", $this->studentsid);

      // execute query
      $stmt->execute();
      return $stmt;
    }

    // Read all Students by Exam ID
    function readByExamID(){
    
      // select all query
      $query = "SELECT studentsid, taken, score 
                FROM students2exams
                WHERE examsid = :examsid";

      // prepare query statement
      $stmt = $this->conn->prepare($query);

      // sanitize
      $this->examsid=htmlspecialchars(strip_tags($this->examsid));

      // bind values
      $stmt->bindParam(":examsid", $this->examsid);

      // execute query
      $stmt->execute();
      return $stmt;
    }

    // Add student to exam
    function create(){
    
      // query to insert record
      $query = "INSERT INTO students2exams SET examsid=:examsid, studentsid=:studentsid, taken=0, score=0";
  
      // prepare query
      $stmt = $this->conn->prepare($query);
  
      // sanitize
      $this->examsid=htmlspecialchars(strip_tags($this->examsid));
      $this->studentsid=htmlspecialchars(strip_tags($this->studentsid));
  
      // bind values
      $stmt->bindParam(":examsid", $this->examsid);
      $stmt->bindParam(":studentsid", $this->studentsid);
  
      // execute query
      if($stmt->execute()){
          return true;
      }
  
      return false; 
    }

    // Delete student from exam
    function delete(){

      // query to insert record
      $query = "DELETE FROM students2exams WHERE examsid=:examsid AND studentsid=:studentsid";
  
      // prepare query
      $stmt = $this->conn->prepare($query);
  
      // sanitize
      $this->examsid=htmlspecialchars(strip_tags($this->examsid));
      $this->studentsid=htmlspecialchars(strip_tags($this->studentsid));
  
      // bind values
      $stmt->bindParam(":examsid", $this->examsid);
      $stmt->bindParam(":studentsid", $this->studentsid);
  
      // execute query
      if($stmt->execute()){
          return true;
      }
  
      return false; 
    }

    function enterScore(){
    
      // query to insert record
      $query = "UPDATE students2exams SET taken=:taken, score=:score WHERE examsid=:examsid AND studentsid=:studentsid";
  
      // prepare query
      $stmt = $this->conn->prepare($query);
  
      // No need to sanitize. Values are not from user entered items
      
      // bind values
      $stmt->bindParam(":taken", $this->taken);
      $stmt->bindParam(":score", $this->score);
      $stmt->bindParam(":examsid", $this->examsid);
      $stmt->bindParam(":studentsid", $this->studentsid);
  
      // execute query
      if($stmt->execute()){
          return true;
      }
  
      return false; 
    }
}