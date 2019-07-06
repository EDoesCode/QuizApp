<?php
class Exams{
 
    // database connection and table name
    private $conn;
    private $table_name = "exams";

    // object properties
    public $id;
    public $name;
    public $opens;
    public $closes;

    // constructor with $db as database connection
    public function __construct($db){
        $this->conn = $db;
    }

    // read exams
    function read(){

      // select all query
      $query = "SELECT id, name, opens, closes 
                FROM exams";

      // prepare query statement
      $stmt = $this->conn->prepare($query);

      // execute query
      $stmt->execute();

      return $stmt;
    } 
    
    // create student
    function create(){
    
      // query to insert record
      $query = "INSERT INTO exams SET name=:name, 
                opens=:opens, closes=:closes";
  
      // prepare query
      $stmt = $this->conn->prepare($query);
  
      // sanitize
      $this->name=htmlspecialchars(strip_tags($this->name));
      $this->opens=htmlspecialchars(strip_tags($this->opens));
      $this->closes=htmlspecialchars(strip_tags($this->closes));
      
      // bind values
      $stmt->bindParam(":name", $this->name);
      $stmt->bindParam(":opens", $this->opens);
      $stmt->bindParam(":closes", $this->closes);
  
      // execute query
      if($stmt->execute()){
          return true;
      }
  
      return false; 
    }

    // update the product
    function update(){
 
      // update query
      $query = "UPDATE exams SET name=:name, opens=:opens, closes=:closes
                WHERE id = :id";
    
      // prepare query statement
      $stmt = $this->conn->prepare($query);
    
      // sanitize
      $this->name=htmlspecialchars(strip_tags($this->name));
      $this->opens=htmlspecialchars(strip_tags($this->opens));
      $this->closes=htmlspecialchars(strip_tags($this->closes));
      $this->id=htmlspecialchars(strip_tags($this->id));
    
      // bind values
      $stmt->bindParam(":name", $this->name);
      $stmt->bindParam(":opens", $this->opens);
      $stmt->bindParam(":closes", $this->closes);
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
      $query = "DELETE FROM exams WHERE id = ?";
    
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