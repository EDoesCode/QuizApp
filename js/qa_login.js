function qaLogin() {
  var email_str = document.getElementById("InputEmail").value;
  var unhashed_password_str = document.getElementById("InputPassword").value;

  var saltPassword = email_str + unhashed_password_str;
  var SHA512 = new Hashes.SHA512;
	var saltHashPassword = SHA512.hex(saltPassword);

  var url = baseURL + 'api2/students/loginweb.php';
  
  // Unsalted and unhashed version
  var jsonPayload = '{"email" : "' + email_str + '", "password" : "' + unhashed_password_str + '"}';
  
  // Salted and hashed version
  // var jsonPayload = '{"email" : "' + email_str + '", "password" : "' + saltHashPassword + '"}';

  console.log('URL: ' + url);
  console.log('Logging in with email: ' + email_str);
  console.log('NoSalt/NoHash password: ' + unhashed_password_str);
  console.log('Salted/Hashed password: ' + saltHashPassword);
 
	var xhr = new XMLHttpRequest();
	xhr.open("POST", url, true,);
	xhr.setRequestHeader("Content-type", "application/json; charset=UTF-8");

	try
	{
		xhr.onreadystatechange = function()
		{
			if(this.readyState == 4) // Wait until document is fully loaded
      {
        if(this.status == 200)
        {
				  window.location.assign("/qa_student.html");
			  } else {  // Only other status is 404
          window.alert("Invalid username or password!");
          window.location.assign("/qa_login.html");
        }
      }
		}
		xhr.send(jsonPayload);
	}
	catch(err)
	{
		alert("Invalid Connection!!");
	}
}
