/* Calls an API from the server with the given payload, then runs the provided function on the resulting response
type: string:    Type of post request 
name: string:    Name of API to call, does not include extension or directory
payload: string: JSON string to send to the server
reaction: function(object): Function to run after receiving a response from the server.  Takes a parsed JSON Object
showAlert: If true, shows an alert containing the message received from the server (will not show an alert without a message)
failedReaction: function(): Function to run after receiving a negative response from the server.
*/

function apiRequest(type, name, payload = null, reaction = null, showAlert = true, failedReaction = null)
{
    var apiExtension = ".php";
    // baseURL is defined in baseURL.js
    var url = baseURL + 'api2/' + name + apiExtension;
	var xhr = new XMLHttpRequest();
	xhr.open(type, url, true);
	xhr.setRequestHeader("Content-type", "application/json; charset=UTF-8");
	
	// Defining reaction function
	xhr.onreadystatechange = function()
	{
        // Only runs reaction after receiving the JSON
        if (this.readyState == 4)
        {
            var parsedJSON = JSON.parse(this.responseText);
            // Success statuses, running the function
            if (this.status >= 200 && this.status < 300)
            {
                // Checking received JSON for a non-null error field
                console.log("Received from "+url+":\n"+this.responseText);
                console.log("Error code: "+this.status);
                if (reaction != null)
                    reaction(parsedJSON.records);
            }
            else
            {
                // Error code, displaying message
                if (showAlert && this.status)
                    window.alert(parsedJSON.message+"\nError code: "+this.status);
                if (failedReaction !== null)
                    failedReaction();
            }
        }
	}
	// Echoing JSON to console
	console.log("Posting to "+url+": \n"+JSON.stringify(payload));
	
	// Sending JSON
	try
	{
        if (payload === null)
            xhr.send();
        else
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
function makeTable(type, headers, keys, objects)
{
    if (headers.length != keys.length)
    {
        console.log("Error on function makeTable: headers/keys length mismatch.");
    }
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
        let curRow = makeRow(type, keys,objects[row]);
        tableBody.append(curRow);
    }
    table.append(tableBody);
    table.attr("class", "table table-hover");
    table.attr("id", "myTable");
    return table;
}

/* Returns a row to be appended to a table.
type: int: Type of table to make.  Can be TABLE_CRUD, TABLE_CHECK, or TABLE_QUESTION
headers: string[]:  Headers on the top row of the table
keys: string[]:     Variables within the object to place in each column.  Should loosely match headers
curObj: object:     Object containing data to populate the row with.
*/
function makeRow(type, keys, curObj)
{
    let row = $(document.createElement('tr'));
    for (var col = 0; col < keys.length; col++)
    {
        let td = $(document.createElement('td'));
        let cellVal = curObj[keys[col]];
        // Final column is a checkbox in checkbox tables
        if (type == TABLE_CHECK && col == keys.length - 1)
        {
            checkBox = $(document.createElement('input'));
            checkBox.attr("type", "checkbox");
            let checked = true;
            if (cellVal == "false" || !cellVal)
                checked = false;
            checkBox.attr("checked", checked);
            checkBox.attr("id", "check" + curObj.id);
            td.append(checkBox);
        }
        else
            td.text(cellVal);
        row.append(td);
    }
    //Adding row buttons
    if (type == TABLE_CRUD)
    {
        for (i = 0; i < 2; i++)
        {
            let td = $(document.createElement('td'));
            let button = $(document.createElement('button'));
            if (i == 0)
            {
                button.html("Modify");
                button.attr("onclick", "openModify(" + curObj.id + ")");
            }
            else
            {
                button.html("Delete");
                button.attr("onclick", "deleteData("+ curObj.id+ ")");
            }
            button.attr("class", "btn btn-primary");
            td.append(button);
            row.append(td);
        }
    }
    return row;
}

/* Returns a combo box object filled with combo options from the given data
objects: object[]: List of objects to transform into combo options
*/
function makeComboBox(objects)
{
    var comboBox = $(document.createElement("select"));
    for (var i = 0; i < objects.length; i++)
        comboBox.append(makeComboBoxOption(objects[i]));
    comboBox.attr("id", "comboBox");
    comboBox.change(loadTableFromCombo);
    return (comboBox);
}

// comboNameKey: Variable that indicates which variable is used for the combo box's name
comboNameKey = null;

// Returns a ComboBoxOption to be appended to an existing Select box
function makeComboBoxOption(curObj)
{
    if (comboNameKey === null)
    {
        console.log("comboNameKey is not set on this page.");
        return null;
    }
    let option = $(document.createElement('option'));
    option.attr("value", curObj.id);
    option.html(curObj[comboNameKey]);
    return option;
}

// Each page.js file implements populateFields() separately
/* Opens the student adding div and closes the table div
id: int: ID number of data to modify.  If not modifying existing data, leave as -1
*/
function openCreateModify(id = -1)
{
    $(displayData).hide();
    // Capitalizes the first letter of the directory name and removes the plural
    var directoryName = directory.slice(0,1).toUpperCase() + directory.slice(1,directory.length-1);
    if (id !== -1)
    {
        // Update form
        try {
            if (populateFields === null)
                throw "";
            populateFields( getDataById(data, id) );
        }
        catch(err)
        {
            console.log("Cannot populate data fields without a populateFields(id) function.");
        }
        $(submitButton).attr("onclick", "updateData(" + id + ")");
        $(submitButton).attr("value", "Update "+directoryName);
        window.location.hash = "modify" + id;
    }
    else
    {
        // Create form
        $(submitButton).attr("onclick", "submitData()");
        $(submitButton).attr("value", "Add "+directoryName);
        window.location.hash = "create";
    }
    $(submitButton).attr("class", "btn btn-primary");
    $(cancelButton).attr("onclick", "cancelCreateModify()");
    $(cancelButton).attr("value", "Cancel");
    $(cancelButton).attr("class", "btn btn-primary");
    $(addDiv).show();
}

/* Reloads the page */
function cancelCreateModify()
{
    // $(addDiv).hide();
    // $(tableDiv).show();
    if (window.location.hash)
    {
        // window.location = window.location.href.split('#')[0];
        // console.log(window.location.hash)
        history.pushState(null, null, ' ');
    }
    location.reload();
}

/* Loads the div for modifying the given object by id
id: int: Database ID for the given object
*/
function openModify(id)
{
    openCreateModify(id);
}

/* Closes the div for modifying */
/* Returns the data object with the given ID
dataArray: object[]: Array of objects with an id property
id: int: ID number
*/
function getDataById(dataArray, id)
{
    for (var i = 0; i < dataArray.length; i++)
    {
        if (dataArray[i].id == id)
            return dataArray[i];
    }
    return null;
}


// Each page must have directory: string: directory where the corresponding PHP files are stored
directory = null;

// Each page implements getDataObject(id: int = null) separately
// getDataObject must throw an error if the fields are invalid.
getDataObject = null;

/* Calls an API to read the data from the page's associated directory
reaction: function: Script to run using read data object.  Loads the data into the data variable and builds a table by default
dir: string: directory to read data from.  Calls default if null
*/
function readData(reaction = loadDataTable, dir = null)
{
    if (dir === null)
        dir = directory;
    if (dir === null)
    {
        console.log("Error: directory not defined in this page's JS file.");
        return;
    }
    if (reaction === loadDataTable && loadTable === null)
    {
        console.log("Error: loadTable(data) not defined in this page's JS file.");
        return;
    }
    let fullDir = dir + "/read";
    if (onServer)
        apiRequest("GET", fullDir, null, reaction);
    else
        reaction(unitTests[dir]);
}

// Each page implements loadTable(dataArray) separately
loadTable = null;

// data refers to the main table data on a page
data = null;

// comboData refers to the data stored in the combo box
comboData = null;

// mappingData refers to the data mapping between the combo box and the table data
mappingData = null;

/* Function that builds a combo box and a mapping table with the given data
comboPath: string:  Path to the PHP that returns data for the combo box.
tablePath: string:  Directory that stores data for the table
*/
function readAndLoadMappedData(comboDir, tableDir)
{
    // Separates process into two functions that execute one-after-another through api requests
    var readTableThenCombo = function(receivedData)
    {
        data = receivedData;
        readData(loadDataComboBox, comboDir);
    }
    readData(readTableThenCombo, tableDir)
}

/* Reads received data array from a read call, sets the page's data to it, and loads the table
newData: object[]: Object array of data entries
*/
function loadDataTable(newData)
{
    data = newData;
    // Clearing existing table, if one exists
    $(tableDiv).empty();
    loadTable(data);
}

/* Loads the combo box on the page with the given data array and adds Edit button
newData: object[]: Object array of data entries 
*/
function loadDataComboBox(newData)
{
    comboData = newData;
    $(comboBoxDiv).append(makeComboBox(comboData));
    loadTableFromCombo();
}

/* Loads a new version of the datatable with desired mapping from the combo box */
function loadTableFromCombo()
{
    var payload = {examsid: $(comboBox).val()};
    var loadMappedTable = function(maps) {
        mappingData = maps;
        $(tableDiv).empty();
        loadTable(data);
    }
    var loadEmptyMaps = function() {
        mappingData = [];
        $(tableDiv).empty();
        loadTable(data);
    }
    apiRequest("POST", directory+"/readByExamID", payload, loadMappedTable, false, loadEmptyMaps);
}

/* Deletes the data object with the given id from the database and reloads the page
id: int: ID number of data object
*/
function deleteData(id)
{
    if (directory === null)
    {
        console.log("Error: directory not defined in this page's JS file.");
        return;
    }
    else if (getDataObject === null)
    {
        console.log("Error: getDataObject() function not defined in this page's JS file.")
        return;
    }
    let fullDir = directory + "/delete";
    let payload = {id: id};
    apiRequest("DELETE", fullDir, payload)
    location.reload();
}

/* Submits the data object to the database and reloads the page
id: int: ID of object to update.  If creating, leave empty
*/
function submitData(id = -1)
{
    if (directory === null)
    {
        console.log("Error: directory not defined in this page's JS file.");
        return;
    }
    else if (getDataObject === null)
    {
        console.log("Error: getDataObject() function not defined in this page's JS file.")
        return;
    }
    var dataObject;
    try
    {
        dataObject = getDataObject();
    }
    catch(err)
    {
        alert(err);
        return;
    }
    // Determining request type (POST for Create, PUT for Update)
    let requestType = "POST";
    let fullDir = directory + "/create";
    if (id != -1)
    {
        dataObject.id = id;
        requestType = "PUT";
        fullDir = directory + "/update";
    }
    let payload = dataObject;
    let reloadPage = function() {location.reload()};
    apiRequest(requestType, fullDir, payload, reloadPage);
}

/* Submits an updated data object to the database and reloads the page
id: int: ID of object to update.
*/
function updateData(id)
{
    submitData(id);
}

/* Searches all data points for a given substring in their properties, then returns a list of results
substring: string: String that must be present in at least one field in all the data.
*/
function filterTable()
{
    // Pull parameters directly from searchText input
    var search = $(searchText).val();
    // Removing case-sensitivity by converting to lowercase
    var lowerCaseSearch = search.toLowerCase();
    var validData = [];
    var props = Object.keys(data[0]);
    var propTypes = [];
    // Getting property datatypes
    for (var i = 0; i < props.length; i++)
        propTypes[i] = typeof(data[0][props[i]]);
    for (var i = 0; i < data.length; i++)
    {
        // Iterating through data
        var curData = data[i];
        for (var j = 0; j < props.length; j++)
        {
            // Iterating through each property on the data
            var curProp = curData[props[j]];
            // Cannot check null data
            if (curProp === null)
                continue;
            var valid = false;
            // Strings can contain the search term as a substring
            if (propTypes[j] == "string")
            {
                // Case-insensitive searching
                var lowerCaseProp = curProp.toLowerCase();
                if (lowerCaseProp.includes(lowerCaseSearch))
                    valid = true;
            }
            if (curProp == search)
                valid = true;
            if (valid)
            {
                validData.push(curData);
                break;
            }
        }
    }
    // Clearing existing table, if one exists
    $(tableDiv).empty();
    loadTable(validData);
}

/* Builds a Search/Add bar to display above a table */
function buildSearchAddBar()
{
    // Injecting raw HTML to make the bar with Bootstrap
    $(searchAddBar).html(
    `
    <table id="crTable">
    <tr>
      <td><input type="text" id="searchText" size="40" placeholder="Push search to clear filter"/> <input type="button" id="searchButton" class="btn btn-primary" onclick="filterTable()" value="Search" /></td>
      <td class="float-right pr-5"><input type="button" id="openCreateModifyButton" onclick="openCreateModify()" value="Create" class="btn btn-primary" /></td>
    </tr>
  </table>
  `
    )
    // Making it so that an Enter press performs a search
    $(searchText).keyup(function(event) {
        if (event.keyCode == 13)
        {
            $(searchButton).click();
        }
    })
}

// Opening Create div if URL contains "create"
function jumpToCreate()
{
    // Adding jumping functionality to link
    $(window).on('hashchange', jumpToCreate);
    // Jumping straight to create if link ends in #create
    var url = window.location.href;
    var command = url.split("#")[1];
    if (command == "create")
    {
        // Clearing any existing fields
        $(":input", "#addDiv")
        .not(':button, :radio, :submit, :reset, :hidden')
        .val('')
        .prop('checked', false)
        .prop('selected', false);
        openCreateModify();
        return true;
    }
    return false;
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
        {id: 0, firstname: "Professor", lastname: "McProfessorson", email: "professor@someuniversity.lol", password: "admin", isAdmin: 1, challenge: "", verified: ""},
        {id: 1, firstname: "Berniece", lastname: "Centers", email: "berniececenters@example.com", password: "password", isAdmin: 0, challenge: "", verified: ""},
        {id: 3, firstname: "Kyle", lastname: "Sims", email: "kyle_sims@example.com", password: "pass123", isAdmin: 0, challenge: "", verified: ""},
        {id: 5, firstname: "Paul", lastname: "Marshall", email: "paul-86@example.com", password: "marshall", isAdmin: 1, challenge: "", verified: ""},
        {id: 7, firstname: "Jesse", lastname: "Delgado", email: "jesse98@example.com", password: "jessjess", isAdmin: 0, challenge: "", verified: ""}
    ],
    questions: [
        {id: 5, question: "How many licks does it take to get to the tootsie-roll center of a Tootsie Pop?", a: "1", b: "2", c: "3", d: "CRUNCH", e: "", answer: "d", numberchoices: "4"},
        {id: 2, question: "Does life on Mars exist?", a: "Yes", b: "No", c: "Maybe so", d: "", e: "", answer: "b", numberchoices: "3"},
        {id: 19, question: "What is the name of the University of Central Florida?", a: "University of Central Florida", b: "Cancun", c: "", d: "", e: "", answer: "a", numberchoices: "2"},
        {id: 53, question: "What have I got in my pocket?", a: "A bit of lint", b: "Some string", c: "A ring", d: "A New York Welcome", e: "A golden ticket", answer: "c", numberchoices: "4"}
    ],
    students2exams: [
        {id: 1, examsid: 1, studentsid: 1, taken: true, score: 80},
        {id: 2, examsid: 1, studentsid: 3, taken: false, score: null},
        {id: 3, examsid: 2, studentsid: 1, taken: true, score: 60},
    ]
}

