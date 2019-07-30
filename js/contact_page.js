// Lists the various fields of a Contact in the order they are displayed
var dataMap = ["FirstName", "LastName", "Phone", "Email", "Address1", "Address2", "City", "State", "Zip"];

// Lists the sizes of various fields of a Contact in the order they are displayed, -1 for infinite size
var dataSize = [-1, -1, 15, -1, -1, -1, -1, 2, 5];
var urlBase = "https://fullernetwork.com/";

// Sends an XML post to the given API name using the given JS object as payload, and runs the provided function (reaction) on success
// If the XML post fails (for whatever reason) it outputs the text in the given error text field
function apiRequest(name, payload, errorField, reaction)
{
	var apiExtension = ".php";
	// Starting post request
	var url = urlBase + 'api/' + name + apiExtension;
	var xhr = new XMLHttpRequest();
	xhr.open("POST", url, true);
	xhr.setRequestHeader("Content-type", "application/json; charset=UTF-8");
	
	// Defining reaction function
	xhr.onreadystatechange = function()
	{
		// If the returned JSON has an error, it will be displayed in errorField
		try
		{
			// Only runs reaction after receiving the JSON
			if (this.readyState == 4 && this.status == 200) 
			{
				// Checking received JSON for a non-null error field
				console.log("Received from "+url+":\n"+this.responseText);
				var parsedJSON = JSON.parse(this.responseText);
				console.log("Parsed JSON successfully");
				if (parsedJSON.error == "" || parsedJSON.error === undefined)
				{
					console.log("JSON does not contain error");
					reaction(parsedJSON);
					console.log("Function completed successfully.");
				}
				else
				{
					throw new Error(parsedJSON.error);
				}
			}
		}
		catch(err)
		{
			// Displays error from JSON in the error field
			errorField.innerHTML = err.message;
		}
	}
	// Echoing JSON to console
	console.log("Sending to "+url+": \n"+JSON.stringify(payload));
	
	// Sending JSON
	try
	{
		xhr.send(JSON.stringify(payload));
	}
	catch(err)
	{
		errorField.innerHTML = err.message;
	}
}

// Refreshes the page
function refreshPage()
{
	window.location.reload(true);
}

// Calls the API to log the user out and returns the user to the login page
function logOut()
{
    payload = "{}"
    errorField = null;
    apiRequest("Logout", payload, errorField, function() {});
    // Reloading the page
    window.location = urlBase+"/login_page.html";
}

// Adds a contact to the database and to the table
function addContact()
{
	// Finding data fields
	var dataTable = document.getElementById("addTable");
	var data = dataTable.getElementsByTagName("input");
	// Building payload
	var payload = {
	FirstName:	data["FirstName"].value,
	LastName:	data["LastName"].value,
	Address1:	data["Address1"].value,
	Address2:	data["Address2"].value,
	City:		data["City"].value,
	State:		data["State"].value,
	Zip:		data["Zip"].value,
	Phone:		data["Phone"].value,
	Email:		data["Email"].value
	};
	// Clearing data fields
	var i;
	for (i = 0; i < dataMap.length; i++)
		data[dataMap[i]].value = "";
	var errorField = document.getElementById("addText");
	apiRequest("InsertContact", payload, errorField, function() {
		// Reloading the page
		window.location.reload(true);
	});
}


// Loads the full Contacts table
function getAllContacts()
{
	var payload = {};
	var errorField = document.getElementById("responseText");
	apiRequest("ShowContacts", payload, errorField, buildContactTable);
}

// Searches through the database for Contacts and updates the table 
function searchContacts()
{
	// Clearing error field
	var errorField = document.getElementById("responseText");
	errorField.innerHTML = "";
	var search = document.getElementById("searchText").value;
	var searchText = search.value;
	// Clearing search field
	search.value = "";
	
	// Payload (to be JSONified later)
	var payload = {SearchText: search};
	apiRequest("FilterContacts", payload, errorField, buildContactTable);
}

// Builds contact table using supplied contactList (parsed JSON Object)
function buildContactTable(contactList)
{
	// Reloading the contact list
	clearContactTable();
	var i;
	// Adding each row individually
	for (i=0; i<contactList.length; i++)
	{
		addContactRow(i+1, contactList[i]);
	}
	/*
		// Testing script with hardcoded data
		clearContactTable();
		var contactList = new Array();
		contactList[0] = {FirstName: "John", LastName: "Doe", Address1: "1234 Sesame St", Address2: "sdf", City: "Nowhere", State: "NA", Zip: "123456", Phone: "123-456-7890", Email: "johnny@gmail.com", ContactID: "1"};
		contactList[1] = {FirstName: "Jean", LastName: "Doe", Address1: "1234 Sesame St", Address2: "Apt 13", City: "Nowhere", State: "NA", Zip: "123456", Phone: "123-456-7890", Email: "johnny@gmail.com", ContactID: "2"};
		contactList[2] = {FirstName: "Joke", LastName: "Doe", Address1: "1234 Sesame St", Address2: "", City: "Nowhere", State: "NA", Zip: "123456", Phone: "123-456-7890", Email: "johnny@gmail.com", ContactID: "3"};
		contactList[3] = {FirstName: "Jane", LastName: "Doe", Address1: "1234 Sesame St", Address2: "", City: "Nowhere", State: "NA", Zip: "123456", Phone: "123-456-7890", Email: "johnny@gmail.com", ContactID: "4"};
		contactList[4] = {FirstName: "Jonathan", LastName: "Doe", Address1: "1234 Sesame St", Address2: "", City: "Nowhere", State: "NA", Zip: "123456", Phone: "123-456-7890", Email: "johnny@gmail.com", ContactID: "5"};
		contactList[5] = {FirstName: "Jill", LastName: "Doe", Address1: "1234 Sesame St", Address2: "", City: "Nowhere", State: "NA", Zip: "123456", Phone: "123-456-7890", Email: "johnny@gmail.com", ContactID: "6"};
		contactList[6] = {FirstName: "Jackson", LastName: "Doe", Address1: "1234 Sesame St", Address2: "", City: "Nowhere", State: "NA", Zip: "123456", Phone: "123-456-7890", Email: "johnny@gmail.com", ContactID: "7"};
		var i;
		for (i=0; i<contactList.length; i++)
		{
			addContactRow(i + 1, contactList[i]);
		}
	*/
}

// Clears all rows (other than the header) from the Contact Table
function clearContactTable()
{
	var table = document.getElementById("contactTable");
	var rows = table.rows;
	while (rows.length > 1)
		table.deleteRow(1);
}

// Transforms one Contact JSON into a row for contactTable and adds it
function addContactRow(rowNum, contact)
{
	// Adding the row to the table
	var table = document.getElementById("contactTable");
	var contactID = contact["ContactID"];
	var row = table.insertRow(rowNum);
	row.setAttribute("id", "row" + contactID);
	
	// Iterating through each of the cells
	var dataType, cell, i, curCol;
	for (i = 0, curCol = 0; i < dataMap.length; i++, curCol++)
	{
		dataType = dataMap[i];
		// Skipping address2 when empty
		if (dataType == "Address2" && contact["Address2"] == "")
		{
			continue;
		}
		data = contact[dataType];
		cell = row.insertCell(curCol);
		cell.innerHTML = data;
		// Merging address1 and address2 cells if only one address is present
		if (dataType == "Address1" && contact["Address2"] == "")
		{
			cell.setAttribute("colspan", "2");
			curCol--;
		}
	}
	
	// The semifinal cell is a button that links to a modification function
	cell = row.insertCell(curCol);
	var changeButton = document.createElement("BUTTON");
	changeButton.setAttribute("id", "button"+contactID);
	changeButton.setAttribute("onclick", "makeChangeableRow("+contactID+")");
	changeButton.innerHTML = "Change";
	cell.appendChild(changeButton);
	// The final cell is a button that links to a deletion function
	cell = row.insertCell(curCol+1);
	var deleteButton = document.createElement("BUTTON");
	deleteButton.innerHTML = "Delete";
	deleteButton.setAttribute("onclick", "deleteRow("+contactID+")");
	cell.appendChild(deleteButton);
}

// Transforms a row into a changeable row with input text fields
function makeChangeableRow(contactID)
{
	// Getting row and button to change
	row = document.getElementById("row"+contactID);
	btn = document.getElementById("button"+contactID);
	// Getting cells
	var cells = row.getElementsByTagName("td");
	var i, curCol, dataType;
	// Replacing text of cells with editable text fields
	for (i = 0, curCol = 0; i < dataMap.length; i++, curCol++)
	{
		// Creating a text field within the cell 
		dataType = dataMap[i];
		var textField = document.createElement("INPUT");
		textField.setAttribute("type", "text");
		// Gives each text field an ID that is referenced when changing a field
		textField.id = contactID + dataType;
		textField.value = cells[curCol].innerText;
		// Specific sizes for some fields
		if (dataSize[i] != -1)
		{
			textField.maxlength = dataSize[i].toString();
			textField.setAttribute("size", dataSize[i]);
			textField.setAttribute("maxlength",dataSize[i]);
		}
		cells[curCol].innerHTML = "";
		cells[curCol].appendChild(textField);
		// Skipping address2 if address1 occupies both fields
		if (cells[curCol].getAttribute("colspan") == "2")
			i++;
	}
	// Changing button functionality to saving changes
	btn.innerHTML = "Save";
	btn.setAttribute("onclick", "modifyContact("+contactID+")");
}

// Modifies a contact changed in the table row
function modifyContact(contactID)
{
	var dataRow = document.getElementById("row"+contactID);
	var data = dataRow.getElementsByTagName("INPUT");
	// Building payload
	var payload = {
	FirstName:	data[contactID+"FirstName"].value,
	LastName:	data[contactID+"LastName"].value,
	Address1:	data[contactID+"Address1"].value,
	City:		data[contactID+"City"].value,
	State:		data[contactID+"State"].value,
	Zip:		data[contactID+"Zip"].value,
	Phone:		data[contactID+"Phone"].value,
	Email:		data[contactID+"Email"].value,
	ContactID:	contactID
	};
	// Address2 field may not exist
	if (data[contactID+"Address2"] != null)
		payload["Address2"] = data[contactID+"Address2"];
	// Sending payload
	var errorField = document.getElementById("tableResponse");
	apiRequest("UpdateContact", payload, errorField, function() {
		// Confirming success to the user.
		var errorField = document.getElementById("tableResponse");
		errorField.innerHTML = "Your contact has been changed.";
		// Changes row after successful modification
		changeRow(contactID);
	});
}

// Swaps out the text fields in a changeable row for plaintext
function changeRow(contactID)
{
	row = document.getElementById("row"+contactID);
	btn = document.getElementById("button"+contactID);
	// Getting cells
	var cells = row.getElementsByTagName("td");
	var i;
	// Replacing text fields with text
	for (i = 0; i < cells.length - 2; i++)
	{
		var textField = cells[i].firstChild;
		// This also destroys the text field
		cells[i].innerHTML = textField.value;
	}
	// Returning original functionality to button
	btn.innerHTML = "Change";
	btn.setAttribute("onclick", "makeChangeableRow("+contactID+")");
}

// Removes the entry in the database associated with ContactID and removes the row from the displayed table
function deleteRow(contactID)
{
	var payload = {ContactID: contactID};
	var errorField = document.getElementById("tableResponse");
	apiRequest("DeleteContact", payload, errorField, function() {
		var responseField = document.getElementById("tableResponse");
		responseField.innerHTML = "Your contact has been removed.";
		var row = document.getElementById("row"+contactID);
		row.parentNode.removeChild(row);
	});
}
