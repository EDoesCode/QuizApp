<?php
    // Create connection
    $conn = new mysqli("localhost", "dbuser", "g4gj7wEnOY7y", "cop4331");

    // Check connection
    if ($conn->connect_error) {
        die("Connection failed: " . $conn->connect_error);
    } 

    $sql = "SELECT `id`, `firstname`, `lastname`, `email`, `password`, `isAdmin`, `challenge`, `verified` FROM `students`";
    $result = $conn->query($sql);

    echo "<h1>Table: Students</h1>";
    
    if ($result->num_rows > 0) {
        echo file_get_contents("../../css/marktable.css");
        echo "<table>" 
           . "<tr>"
           . "<th>id</th>"
           . "<th>firstname</th>"
           . "<th>lastnameame</th>"
           . "<th>email</th>"
           . "<th>password</th>"
           . "<th>isAdmin</th>"
           . "<th>challenge</th>"
           . "<th>verified</th>"
           . "</tr>";
        
        // output data of each row
        while($row = $result->fetch_assoc()) {
            echo "<tr>" 
               . "<td>" . $row["id"] . "</td>"
               . "<td>" . $row["firstname"] . "</td>" 
               . "<td>" . $row["lastname"] . "</td>"
               . "<td>" . $row["email"] . "</td>"
               . "<td>" . $row["password"] . "</td>"
               . "<td>" . $row["isAdmin"] . "</td>"
               . "<td>" . $row["challenge"] . "</td>"
               . "<td>" . $row["verified"] . "</td>"
               . "</tr>";
        }
        echo "</table>";
    } else {
        echo "No rows found";
    }

    $sql = "SELECT `id`, `name`, `opens`, `closes` FROM `exams`";
    $result = $conn->query($sql);

    echo "<h1>Table: Exams</h1>";
    
    if ($result->num_rows > 0) {
        
        echo "<table>" 
           . "<tr>"
           . "<th>id</th>"
           . "<th>name</th>"
           . "<th>opens</th>"
           . "<th>closes</th>"
           . "</tr>";
        
        // output data of each row
        while($row = $result->fetch_assoc()) {
            echo "<tr>" 
               . "<td>" . $row["id"] . "</td>"
               . "<td>" . $row["name"] . "</td>" 
               . "<td>" . $row["opens"] . "</td>"
               . "<td>" . $row["closes"] . "</td>"
               . "</tr>";
        }
        echo "</table>";
    } else {
        echo "No rows found";
    }

    $sql = "SELECT `id`, `question`, `a`, `b`, `c`, `d`, `e`, `answer`, `numberchoices` FROM `questions`";
    $result = $conn->query($sql);

    echo "<h1>Table: Questions</h1>";
    
    if ($result->num_rows > 0) {
        
        echo "<table>" 
           . "<tr>"
           . "<th>id</th>"
           . "<th>question</th>"
           . "<th>a</th>"
           . "<th>b</th>"
           . "<th>c</th>"
           . "<th>d</th>"
           . "<th>e</th>"
           . "<th>answer</th>"
           . "<th>numberchoices</th>"
           . "</tr>";
        
        // output data of each row
        while($row = $result->fetch_assoc()) {
            echo "<tr>" 
               . "<td>" . $row["id"] . "</td>"
               . "<td>" . $row["question"] . "</td>" 
               . "<td>" . $row["a"] . "</td>"
               . "<td>" . $row["b"] . "</td>"
               . "<td>" . $row["c"] . "</td>"
               . "<td>" . $row["d"] . "</td>"
               . "<td>" . $row["e"] . "</td>"
               . "<td>" . $row["answer"] . "</td>"
               . "<td>" . $row["numberchoices"] . "</td>"
               . "</tr>";
        }
        echo "</table>";
    } else {
        echo "No rows found";
    } 
    
    $sql = "SELECT `id`, `examsid`, `studentsid`, `taken`, `score` FROM `students2exams`";
    $result = $conn->query($sql);

    echo "<h1>Table: Students2Exams</h1>";
    
    if ($result->num_rows > 0) {
        
        echo "<table>" 
           . "<tr>"
           . "<th>id</th>"
           . "<th>examsid</th>"
           . "<th>studentsid</th>"
           . "<th>taken</th>"
           . "<th>score</th>"
           . "</tr>";
        
        // output data of each row
        while($row = $result->fetch_assoc()) {
            echo "<tr>" 
               . "<td>" . $row["id"] . "</td>"
               . "<td>" . $row["examsid"] . "</td>" 
               . "<td>" . $row["studentsid"] . "</td>"
               . "<td>" . $row["taken"] . "</td>"
               . "<td>" . $row["score"] . "</td>"
               . "</tr>";
        }
        echo "</table>";
    } else {
        echo "No rows found";
    }

    $sql = "SELECT `id`, `examsid`, `questionsid` FROM `questions2exams`";
    $result = $conn->query($sql);

    echo "<h1>Table: Questions2Exams</h1>";
    
    if ($result->num_rows > 0) {
       
        echo "<table>" 
           . "<tr>"
           . "<th>id</th>"
           . "<th>examsid</th>"
           . "<th>questionsid</th>"
           . "</tr>";
        
        // output data of each row
        while($row = $result->fetch_assoc()) {
            echo "<tr>" 
               . "<td>" . $row["id"] . "</td>"
               . "<td>" . $row["examsid"] . "</td>" 
               . "<td>" . $row["questionsid"] . "</td>"
               . "</tr>";
        }
        echo "</table>";
    } else {
        echo "No rows found";
    }

    $sql = "SELECT `id`, `examsid`, `studentsid`, `questionsid`, `answered`, `correct` FROM `examresults`";
    $result = $conn->query($sql);

    echo "<h1>Table: Exam Results</h1>";
    
    if ($result->num_rows > 0) {
        
        echo "<table>" 
           . "<tr>"
           . "<th>id</th>"
           . "<th>examsid</th>"
           . "<th>studentsid</th>"
           . "<th>questionsid</th>"
           . "<th>answered</th>"
           . "<th>correct</th>"
           . "</tr>";
        
        // output data of each row
        while($row = $result->fetch_assoc()) {
            echo "<tr>" 
               . "<td>" . $row["id"] . "</td>"
               . "<td>" . $row["examsid"] . "</td>" 
               . "<td>" . $row["studentsid"] . "</td>" 
               . "<td>" . $row["questionsid"] . "</td>"
               . "<td>" . $row["answered"] . "</td>"
               . "<td>" . $row["correct"] . "</td>"
               . "</tr>";
        }
        echo "</table>";
    } else {
        echo "No rows found";
    }

    
    $conn->close();
?>
