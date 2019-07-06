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
}