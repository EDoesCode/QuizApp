
$(document).ready(function() {
    $(addDiv).hide();
    data = null;
    directory = "students";
    var upperCaseDirectory = directory.charAt(0).toUpperCase()+directory.substring(1);
    $(pageTitle).html(upperCaseDirectory);
    readData();
    jumpToCreate();
})
/* Loads the student table into tableDiv
students: object[]: Array of Student objects
*/
function loadTable(students)
{
    // Replacing "true" and "false" strings with "yes" and "no"
    for (var i = 0; i < students.length; i++)
    {
        students[i].isAdminClean = (students[i].isAdmin === "1" ? "Yes" : "No");
    }
    let headers = ["First Name", "Last Name", "Email", "Admin?"];
    let keys = ["firstname", "lastname", "email", "isAdminClean"];
    let table = makeTable(TABLE_CRUD, headers, keys, students);
    table.attr("id", "studentTable");
    buildSearchAddBar();
    $(tableDiv).append(table);
}

/* Populates the fields of the data entry form when modifying an existing entry.  Each page needs this function
curData: Student: data object to populate the fields with
*/
function populateFields(curData)
{
    if (curData === null)
        return;
    $(email).val(curData.email);
    $(first).val(curData.firstname);
    $(last).val(curData.lastname);
    $(password).val(curData.password);
    $(confirmPassword).val(curData.password);
    var checkAdmin = (curData.isAdmin == "1");
    console.log(checkAdmin);
    $(isAdmin).prop("checked", checkAdmin);
}

/* Creates a Student object from the fields on this page
id: int: ID number of object.  If left blank, Student will have no ID field
*/
function getDataObject(id = null)
{
    var dataObj = {};
    if (id !== null)
        dataObj.id = id;
    dataObj.email = $(email).val();
    dataObj.firstname = $(first).val();
    dataObj.lastname = $(last).val();
    dataObj.password = $(password).val();
    dataObj.isAdmin = $(isAdmin).prop("checked") ? "1" : "0";
    dataObj.challenge = "000000";
    dataObj.verified = true;
    // Erroneous inputs
    if (dataObj.email == "")
        throw ("Student must have an email address");
    if (dataObj.password == "")
        throw ("Student must have a password.");
    if ($(password).val() != $(confirmPassword).val())
        throw ("Password and Confirm Password do not match.");
    return dataObj;
}