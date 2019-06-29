var url = "https://fullernetwork.com/api/qa_register_getCode.php";

function getCode() {
  // Send email address to server to verify not already used
  //   otherwise generates an error
  // Server stores email address entered in a php session
  // along with a random 6 digit verification code
  // Server sends code to the email address entered

  // If no error, turn on next section
  var emailString = document.getElementById("email").value;
  if ( !looksLikeEmail(emailString) ) {
    alert("This does not appear to be a valid email format.");
    return;
  }
  
  // var jsonPayload = '{"email" : "' + emailString + '"}';
  // var xhr = new XMLHttpRequest();
  // xhr.open("POST", url, true,);
  // xhr.setRequestHeader("Content-type", "application/json; charset=UTF-8");
  // try {
	// 	xhr.onreadystatechange = function() {
	// 		if(this.readyState == 4 && this.status == 200) {
	// 			console.log(xhr.responseText);
	// 			var jsonResponse = JSON.parse(xhr.responseText);
	// 			console.log(jsonResponse);
	// 			if(jsonResponse.error == "")
	// 				window.location = baseURL + "contact_page.html";
	// 			else
	// 				alert(jsonResponse.error);
	// 		}
	// 	}
	// 	xhr.send(jsonPayload);
	// }
	// catch(err){
	// 	alert("Invalid Connection!!");
  // }
  
  document.getElementById("enterChallenge").style.display = "block";
}

function validateCode() {
  document.getElementById("enterEmail").style.display = "none";
  document.getElementById("enterChallenge").style.display = "none";
  document.getElementById("registerDetails").style.display = "block";
  document.getElementById("emailLabel").innerHTML = document.getElementById("email").value;
}

function register() {

}

function looksLikeEmail(str) {
  var lastAtPos = str.lastIndexOf('@');
  var lastDotPos = str.lastIndexOf('.');
  return (lastAtPos < lastDotPos && lastAtPos > 0 && str.indexOf('@@') == -1 && lastDotPos > 2 && (str.length - lastDotPos) > 2);
}