function apiRequest(name, payload, reaction = null, showAlert = true)
{
    var apiExtension = ".php";
    // baseURL is defined in baseURL.js
    var url = baseURL + 'api/' + name + apiExtension;
	var xhr = new XMLHttpRequest();
	xhr.open("POST", url, true);
	xhr.setRequestHeader("Content-type", "application/json; charset=UTF-8");
	
	// Defining reaction function
	xhr.onreadystatechange = function()
	{
        // Only runs reaction after receiving the JSON
        if (this.readyState == 4)
        {
            // Success statuses, running the function
            if (this.status == 200 || this.status == 201)
            {
                // Checking received JSON for a non-null error field
                console.log("Received from "+url+":\n"+this.responseText);
                console.log("Error code: "+this.status);
                var parsedJSON = JSON.parse(this.responseText);
                console.log("Parsed JSON successfully");
                if (showAlert && this.message)
                    alert(this.message);
                if (reaction != null)
                    reaction(parsedJSON);
            }
            else
            {
                // Error code, displaying message
                if (showAlert && this.message)
                    alert(this.message+"\nError code: "+this.status);
            }
        }
	}
	// Echoing JSON to console
	console.log("Posting to "+url+": \n"+JSON.stringify(payload));
	
	// Sending JSON
	try
	{
		xhr.send(JSON.stringify(payload));
	}
	catch(err)
	{
		console.log("xhr request to "+url+" failed.");
	}
}