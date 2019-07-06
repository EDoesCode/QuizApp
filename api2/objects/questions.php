<?php
class Questions{
 
    // database connection and table name
    private $conn;
    private $table_name = "questions";
 
    // object properties
    public $id;
    public $question;
    public $a;
    public $b;
    public $c;
    public $d;
    public $e;
    public $answer;
    public $numberchoices;
 
    // constructor with $db as database connection
    public function __construct($db){
        $this->conn = $db;
    }

    // read questions
    function read(){
      
      // select all query
      $query = "SELECT id, question, a, b, c, d, e, answer, numberchoices 
                FROM questions";

      // prepare query statement
      $stmt = $this->conn->prepare($query);

      // execute query
      $stmt->execute();

      return $stmt;
    }
    
    // create student
    function create(){
    
      // query to insert record
      $query = "INSERT INTO questions SET question=:question, a=:a, b=:b, c=:c, d=:d, e=:e,
                 answer=:answer, numberchoices=:numberchoices";
  
      // prepare query
      $stmt = $this->conn->prepare($query);
  
      // sanitize
      $this->question=htmlspecialchars(strip_tags($this->question));
      $this->a=htmlspecialchars(strip_tags($this->a));
      $this->b=htmlspecialchars(strip_tags($this->b));
      $this->c=htmlspecialchars(strip_tags($this->c));
      $this->d=htmlspecialchars(strip_tags($this->d));
      $this->e=htmlspecialchars(strip_tags($this->e));
      $this->answer=htmlspecialchars(strip_tags($this->answer));
      $this->numberchoices=htmlspecialchars(strip_tags($this->numberchoices));

      // bind values
      $stmt->bindParam(":question", $this->question);
      $stmt->bindParam(":a", $this->a);
      $stmt->bindParam(":b", $this->b);
      $stmt->bindParam(":c", $this->c);
      $stmt->bindParam(":d", $this->d);
      $stmt->bindParam(":e", $this->e);
      $stmt->bindParam(":answer", $this->answer);
      $stmt->bindParam(":numberchoices", $this->numberchoices);
  
      // execute query
      if($stmt->execute()){
          return true;
      }
  
      return false; 
    }

    // update the product
    function update(){
 
    // update query
    $query = "UPDATE questions SET question=:question, a=:a, b=:b, c=:c, d=:d, e=:e,
                                   answer=:answer, numberchoices=:numberchoices
              WHERE id = :id";
  
    // prepare query statement
    $stmt = $this->conn->prepare($query);
  
    // sanitize
    $this->question=htmlspecialchars(strip_tags($this->question));
    $this->a=htmlspecialchars(strip_tags($this->a));
    $this->b=htmlspecialchars(strip_tags($this->b));
    $this->c=htmlspecialchars(strip_tags($this->c));
    $this->d=htmlspecialchars(strip_tags($this->d));
    $this->e=htmlspecialchars(strip_tags($this->e));
    $this->answer=htmlspecialchars(strip_tags($this->answer));
    $this->numberchoices=htmlspecialchars(strip_tags($this->numberchoices));
    $this->id=htmlspecialchars(strip_tags($this->id));
  
    // bind values
    $stmt->bindParam(":question", $this->question);
    $stmt->bindParam(":a", $this->a);
    $stmt->bindParam(":b", $this->b);
    $stmt->bindParam(":c", $this->c);
    $stmt->bindParam(":d", $this->d);
    $stmt->bindParam(":e", $this->e);
    $stmt->bindParam(":answer", $this->answer);
    $stmt->bindParam(":numberchoices", $this->numberchoices);
    $stmt->bindParam(":id", $this->id);
  
    // execute the query
    if($stmt->execute()){
        return true;
    }
  
    return false;
    }
  
    // delete the product
    function delete(){
   
    // delete query
    $query = "DELETE FROM questions WHERE id = ?";
  
    // prepare query
    $stmt = $this->conn->prepare($query);
  
    // sanitize
    $this->id=htmlspecialchars(strip_tags($this->id));
  
    // bind id of record to delete
    $stmt->bindParam(1, $this->id);
  
    // execute query
    if($stmt->execute()){
        return true;
    }
  
    return false; 
    }
}