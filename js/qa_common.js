/* Calls an API from the server with the given payload, then runs the provided function on the resulting response
type: string:    Type of post request 
name: string:    Name of API to call, does not include extension or directory
payload: string: JSON string to send to the server
reaction: function(object): Function to run after receiving a response from the server.  Takes a parsed JSON Object
showAlert: If true, shows an alert containing the message received from the server (will not show an alert without a message)
*/

function apiRequest(type, name, payload, reaction = null, showAlert = true)
{
    var apiExtension = ".php";
    // baseURL is defined in baseURL.js
    var url = baseURL + 'api/' + name + apiExtension;
	var xhr = new XMLHttpRequest();
	xhr.open(type, url, true);
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
/* Returns a table with the given information
type: string: Type of table to make.  Can be TABLE_CRUD, TABLE_CHECK, or TABLE_QUESTION
headers: string[]:  Headers on the top row of the table
keys: string[]:     Variables within the objects in the object array to place in each column.  Should loosely match headers
objects: object[]:  Array of objects.  Each row is populated by one object.
modifyFunc: function(id: int): A modify function to be ran upon clicking a modify button.  Leave null to have no button.
deleteFunc: function(id: int): A delete function to be ran upon clicking a delete button.  Leave null to have no button.
*/
const TABLE_CRUD = 0;   // Tables with MODIFY and DELETE buttons
const TABLE_CHECK = 1;  // Tables with checkboxes (with ID labels) in the final column.  The initial value of the checkbox is set to 
function makeTable(type, headers, keys, objects, modifyFunc = null, deleteFunc = null)
{
    if (headers.length != keys.length)
    {
        console.log("Error on function makeTable: headers/keys length mismatch.");
    }
    buttonFuncs = [modifyFunc, deleteFunc];
    var table = $(document.createElement('table'));
    var tableHead = $(document.createElement('thead'));
    var headerRow = $(document.createElement('tr'));
    // Generating headers
    for (var col = 0; col < headers.length; col++)
    {
        let th = $(document.createElement('th'));
        th.text(headers[col]);
        th.attr("scope", "col");
        headerRow.append(th);
    }
    tableHead.append(headerRow);
    table.append(tableHead);
    // Generating rows
    var tableBody = $(document.createElement('tbody'));
    tableBody.attr("id", "myTable");
    for (var row = 0; row < objects.length; row++)
    {
        let curRow = makeRow(type, keys,objects[row], modifyFunc, deleteFunc);
        tableBody.append(curRow);
    }
    table.append(tableBody);
    table.attr("class", "table table-hover");
    table.attr("id", "myTable");
    return table;
}

/* Returns a row to be appended to a table.
type: string: Type of table to make.  Can be TABLE_CRUD, TABLE_CHECK, or TABLE_QUESTION
headers: string[]:  Headers on the top row of the table
keys: string[]:     Variables within the object to place in each column.  Should loosely match headers
curObj: object:     Object containing data to populate the row with.
modifyFunc: function(id: int): A modify function to be ran upon clicking a modify button.  Leave null to have no button.
deleteFunc: function(id: int): A delete function to be ran upon clicking a delete button.  Leave null to have no button.
*/
function makeRow(type, keys, curObj, modifyFunc = null, deleteFunc = null)
{
    let row = $(document.createElement('tr'));
    for (var col = 0; col < keys.length; col++)
    {
        let td = $(document.createElement('td'));
        let data = curObj[keys[col]];
        // Final column is a checkbox in checkbox tables
        if (type == TABLE_CHECK && col == keys.length - 1)
        {
            checkBox = $(document.createElement('input'));
            checkBox.attr("type", "checkbox");
            let checked = true;
            if (data == "false" || !data)
                checked = false;
            checkBox.attr("checked", checked);
            checkBox.attr("id", curObj.id);
            td.append(checkBox);
        }
        else
            td.text(data);
        row.append(td);
    }
    //Adding row buttons
    for (i = 0; i < 2; i++)
    {
        let td = $(document.createElement('td'));
        let curFunc = buttonFuncs[i];
        if (curFunc === null)
            continue;
        let button = $(document.createElement('button'));
        var clickEvent = function() { curFunc(curObj.id) };
        button.click(clickEvent);
        if (type == TABLE_CRUD)
        {
            if (i == 0)
                button.html("Modify");
            else
                button.html("Delete");
            td.append(button);
            row.append(td);
        }
    }
    return row;
}

// Testing object that contains testing functions and sample data
unitTests = {
    exams: [
        {id: 1,     name: "Math Checkup #1",   opens: "2019-07-18T18:17:30.798Z",  closes: "2019-07-18T18:18:30.798Z"},
        {id: 2,     name: "Math Checkup #2",   opens: "2019-07-18T18:18:30.798Z",  closes: "2019-07-18T18:19:30.798Z"},
        {id: 5,     name: "Science Test",      opens: "2019-07-18T18:19:30.798Z",  closes: "2019-07-18T18:20:30.798Z"},
        {id: 17,    name: "Exploring Geometry",opens: "2019-07-18T18:20:30.798Z",  closes: "2019-07-18T18:21:30.798Z"},
        {id: 23,    name: "Another Test",      opens: "2019-07-18T18:21:30.798Z",  closes: "2019-07-18T18:22:30.798Z"},
    ],
    students: [
        {id: 0, firstname: "Professor", lastname: "McProfessorson", email: "professor@someuniversity.lol", password: "admin", isAdmin: "true", challenge: "", verified: ""},
        {id: 1, firstname: "Berniece", lastname: "Centers", email: "berniececenters@example.com", password: "password", isAdmin: "false", challenge: "", verified: ""},
        {id: 3, firstname: "Kyle", lastname: "Sims", email: "kyle_sims@example.com", password: "pass123", isAdmin: "false", challenge: "", verified: ""},
        {id: 5, firstname: "Paul", lastname: "Marshall", email: "paul-86@example.com", password: "marshall", isAdmin: "true", challenge: "", verified: ""},
        {id: 7, firstname: "Jesse", lastname: "Delgado", email: "jesse98@example.com", password: "jessjess", isAdmin: "false", challenge: "", verified: ""}
    ],
    questions: [
        {id: 5, question: "How many licks does it take to get to the tootsie-roll center of a Tootsie Pop?", a: "1", b: "2", c: "3", d: "CRUNCH", e: "", answer: "d", numberchoices: "4"},
        {id: 2, question: "Does life on Mars exist?", a: "Yes", b: "No", c: "Maybe so", d: "", e: "", answer: "b", numberchoices: "3"},
        {id: 19, question: "What is the name of the University of Central Florida?", a: "University of Central Florida", b: "Cancun", c: "", d: "", e: "", answer: "a", numberchoices: "2"},
        {id: 53, question: "What have I got in my pocket?", a: "A bit of lint", b: "Some string", c: "A ring", d: "A New York Welcome", e: "A golden ticket", answer: "c", numberchoices: "4"}
    ]
}