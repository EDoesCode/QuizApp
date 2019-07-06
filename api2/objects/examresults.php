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
}