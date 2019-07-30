<?php
class Questions2Exams{
 
    // database connection and table name
    private $conn;
    private $table_name = "questions2exams";
 
    // object properties
    public $id;
    public $examsid;
    public $questionsid;
     
    // constructor with $db as database connection
    public function __construct($db){
        $this->conn = $db;
    }

    // Get all questions and exam mappings
    function read(){

      // select all query
      $query = "SELECT id, examsid, questionsid  
                FROM questions2exams"; 

      // prepare query statement
      $stmt = $this->conn->prepare($query);

      // execute query
      $stmt->execute();
      return $stmt;
    }

    // Get all questions for given examid
    function readByExamID(){

      // select all query
      $query = "SELECT q2e.examsid, q2e.questionsid, q.question, q.a, q.b, q.c, q.d, q.e, q.numberchoices  
                FROM questions2exams q2e, questions q
                WHERE q2e.questionsid = q.id
                AND q2e.examsid = :examsid";

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

    

    // Add question to exam
    function create(){
    
      // query to insert record
      $query = "INSERT INTO questions2exams SET examsid=:examsid, questionsid=:questionsid";
  
      // prepare query
      $stmt = $this->conn->prepare($query);
  
      // sanitize
      $this->examsid=htmlspecialchars(strip_tags($this->examsid));
      $this->questionsid=htmlspecialchars(strip_tags($this->questionsid));
  
      // bind values
      $stmt->bindParam(":examsid", $this->examsid);
      $stmt->bindParam(":questionsid", $this->questionsid);
  
      // execute query
      if($stmt->execute()){
          return true;
      }
  
      return false; 
    }

    // Delete question from exam
    function delete(){

      // query to delete record
      $query = "DELETE FROM questions2exams WHERE examsid=:examsid AND questionsid=:questionsid";
  
      // prepare query
      $stmt = $this->conn->prepare($query);
  
      // sanitize
      $this->examsid=htmlspecialchars(strip_tags($this->examsid));
      $this->questionsid=htmlspecialchars(strip_tags($this->questionsid));
  
      // bind values
      $stmt->bindParam(":examsid", $this->examsid);
      $stmt->bindParam(":questionsid", $this->questionsid);
  
      // execute query
      if($stmt->execute()){
          return true;
      }
  
      return false; 
    }    
}