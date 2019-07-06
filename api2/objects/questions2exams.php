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
}