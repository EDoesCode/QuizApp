<?php
class Students{
 
    // database connection and table name
    private $conn;
    private $table_name = "students";
 
    // object properties
    public $id;
    public $firstname;
    public $lastname;
    public $email;
    public $password;
    public $isAdmin;
    public $challenge;
    public $verified;
 
    // constructor with $db as database connection
    public function __construct($db){
        $this->conn = $db;
    }
   
    // read students
    function read(){

      // select all query
      $query = "SELECT id, firstname, lastname, email, password, isAdmin, challenge, verified 
                FROM students";

      // prepare query statement
      $stmt = $this->conn->prepare($query);

      // execute query
      $stmt->execute();

      return $stmt;
    }

    // create student
    function create(){
    
    // query to insert record
    $query = "INSERT INTO students SET firstname=:firstname, lastname=:lastname, email=:email, 
              password=:password, isAdmin=:isAdmin, challenge=:challenge, verified=:verified";

    // prepare query
    $stmt = $this->conn->prepare($query);

    // sanitize
    $this->firstname=htmlspecialchars(strip_tags($this->firstname));
    $this->lastname=htmlspecialchars(strip_tags($this->lastname));
    $this->email=htmlspecialchars(strip_tags($this->email));
    $this->password=htmlspecialchars(strip_tags($this->password));
    $this->isAdmin=htmlspecialchars(strip_tags($this->isAdmin));
    $this->challenge=htmlspecialchars(strip_tags($this->challenge));
    $this->verified=htmlspecialchars(strip_tags($this->verified));

    // bind values
    $stmt->bindParam(":firstname", $this->firstname);
    $stmt->bindParam(":lastname", $this->lastname);
    $stmt->bindParam(":email", $this->email);
    $stmt->bindParam(":password", $this->password);
    $stmt->bindParam(":isAdmin", $this->isAdmin);
    $stmt->bindParam(":challenge", $this->challenge);
    $stmt->bindParam(":verified", $this->verified);

    // execute query
    if($stmt->execute()){
        return true;
    }

    return false; 
  }

  // update the product
  function update(){
 
  // update query
  $query = "UPDATE students SET firstname=:firstname, lastname=:lastname, email=:email, 
            password=:password, isAdmin=:isAdmin, challenge=:challenge, verified=:verified
            WHERE id = :id";

  // prepare query statement
  $stmt = $this->conn->prepare($query);

  // sanitize
  $this->firstname=htmlspecialchars(strip_tags($this->firstname));
  $this->lastname=htmlspecialchars(strip_tags($this->lastname));
  $this->email=htmlspecialchars(strip_tags($this->email));
  $this->password=htmlspecialchars(strip_tags($this->password));
  $this->isAdmin=htmlspecialchars(strip_tags($this->isAdmin));
  $this->challenge=htmlspecialchars(strip_tags($this->challenge));
  $this->verified=htmlspecialchars(strip_tags($this->verified));
  $this->id=htmlspecialchars(strip_tags($this->id));

  // bind values
  $stmt->bindParam(":firstname", $this->firstname);
  $stmt->bindParam(":lastname", $this->lastname);
  $stmt->bindParam(":email", $this->email);
  $stmt->bindParam(":password", $this->password);
  $stmt->bindParam(":isAdmin", $this->isAdmin);
  $stmt->bindParam(":challenge", $this->challenge);
  $stmt->bindParam(":verified", $this->verified);
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
  $query = "DELETE FROM students WHERE id = ?";

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

  // check if email exists
  function checkemailexists(){
    // search for email  query
    $query = "SELECT id, email FROM students WHERE email = :email";

    // prepare query statement
    $stmt = $this->conn->prepare($query);

    // Sanitize and bind
    $this->email=htmlspecialchars(strip_tags($this->email));
    $stmt->bindParam(":email", $this->email);

    // execute query
    $stmt->execute();

    // Check results
    $num = $stmt->rowCount();
    if($num>0){
      return true;
    } 
    
    return false;
  }

  // log a student in
  function login(){
    // validate login email/password
    $query = "SELECT id FROM students WHERE email = :email AND  password=:password";

    // prepare query statement
    $stmt = $this->conn->prepare($query);

    // Sanitize and bind
    $this->email=htmlspecialchars(strip_tags($this->email));
    $this->password=htmlspecialchars(strip_tags($this->password));
    $stmt->bindParam(":email", $this->email);
    $stmt->bindParam(":password", $this->password);

    // execute query
    $stmt->execute();
    
    // Check results
    $num = $stmt->rowCount();
    
    //file_put_contents("debug0.txt", $num, FILE_APPEND);
    
    if($num==0){
      return $stmt; // Needs invalid username/password message
    } 
    
    $result = $stmt->fetch();  // May need PDO::FETCH_ASSOC inside ()
    $resultID = $result["id"];
    //file_put_contents("debug1.txt", $result, FILE_APPEND);
    $query2 = "SELECT e.id, e.name, e.opens, e.closes
               FROM students2exams se, exams e
               WHERE se.examsid =  e.id
               AND se.studentsid = $resultID
               AND e.opens < current_timestamp
               AND e.closes > current_timestamp";
    //file_put_contents("debug2.txt", $query2, FILE_APPEND);
    $stmt2 = $this->conn->prepare($query2);           
    $stmt2->execute();
    return $stmt2;
  }
  
}