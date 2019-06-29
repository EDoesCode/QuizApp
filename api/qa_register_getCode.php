<?php
  // Start a session
  session_start();
  $_SESSION["emailAddress"] = null;

  // Capture incoming JSON payload
  $inData = json_decode(file_get_contents('php://input'), true);
  $emailAddress = $inData["email"];
    
  // Validate incoming JSON payload
  if ($emailAddress==null) {
    exitWithError( "Missing required fields" );
  }
  
  // Create database connection
  // $conn = new mysqli("localhost", "dbuser", "g4gj7wEnOY7y", "cop4331");
  $db = json_decode(file_get_contents('dbconfig.json'), true);
  $conn = new mysqli($db["host"], $db["user"], $db["pass"], $db["dbid"]);
  if ($conn->connect_error) {
    exitWithError( "There was a connection problem." );
  }
	    
  // Validate Email Address not already used
  // Email is Unique DB field only 0 or 1 row can exist
  $sql = "select email from students where "
          . "email = '" . $emailAddress . "'";
  $result = $conn->query($sql);
  if ( $result->num_rows > 0 ) {
    $row = $result->fetch_assoc();
    $_SESSION["AccountID"] = $row["AccountID"];
     
    //Update LastLoginDate
    $sql = "update Accounts set LastLoginDate = CURRENT_TIMESTAMP where "
            . "AccountID = '" . $_SESSION["AccountID"] . "'";
    $result = $conn->query($sql);
  }
  else {
    exitWithError("Invalid user name or password");
  }
    
    
    // Default exit with no error status set
    $conn->close(); 
    exitWithError("");
    
    
    // Functions used in script
    function sendResultInfoAsJson( $obj )
	{
		header('Content-type: application/json');
		echo $obj;
	}
	
    function exitWithError( $err )
	{
		$retValue = '{"error" :"' . $err . '"}';
		sendResultInfoAsJson( $retValue );
        exit();
	}

?>
