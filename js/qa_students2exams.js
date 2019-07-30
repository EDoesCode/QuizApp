
$(document).ready(function() {
    data = null;
    curExam = null;
    comboNameKey = "name";
    directory = "students2exams";
    readAndLoadMappedData("exams", "students");
})

/* Loads the student table into tableDiv
maps: object[]: Array of Student objects
*/
function loadTable(students)
{
    // Adding "mapped" variable to students
    let headers = ["Email", "First Name", "Last Name", "Score", "Assigned?"];
    let keys = ["email", "firstname", "lastname", "score", "mapped"];
    // Determining whether students are mapped
    if (!mappingData)
    {
        console.log("Cannot load table; mapping data not loaded first.");
        return;
    }
    for (var i = 0; i < students.length; i++)
    {
        let studentid = students[i].id;
        // Getting map from student to exam
        var map = mappingData.find(function(element) {
            return (element.studentsid === studentid);
        });
        if (map === undefined)
        {
            // Student not mapped
            students[i].score = "Unassigned";
            students[i].mapped = false;
        }
        else
        {
            // Student mapped
            students[i].mapped = true;
            // Student mapped, has not taken exam
            if (map.taken == "0")
                students[i].score = "Not Taken";
            // Student mapped and has taken exam
            if (map.taken == "1")
            {
                students[i].score = Math.round(map.score * 100) + "%";
            }
        }
    }
    let table = makeTable(TABLE_CHECK, headers, keys, students);
    table.attr("id", "studentTable");
    buildSearchAddBar();
    $("#openCreateModifyButton").remove();
    $(tableDiv).append(table);
    // No entries to create
    let button = $(document.createElement("button"));
    // Adding "Save Changes" button
    button.attr("onclick", "saveChanges()");
    button.html("Save Changes");
    button.attr("class", "btn btn-primary");
    $(tableDiv).append(button);
}

/* Saves all mapping changes based on the current table */
function saveChanges()
{
    // Iterating through each checkbox button
    var checkBoxes = $("#myTable").find("input");
    for (var i = 0; i < checkBoxes.length; i++)
    {
        curID = checkBoxes[i].id.substring(5);
        curCheck = checkBoxes[i].checked;
        var map = mappingData.find(function(element) {
            return (element.studentsid == curID)
        })
        let payload = {
            studentsid: curID,
            examsid: $(comboBox).val()
        };
        // Map is not defined and data is checked (Create)
        if (map === undefined && curCheck)
            apiRequest("POST", "students2exams/create", payload, loadTableFromCombo);
        // Map is defined and data is unchecked (Delete)
        if (map && !curCheck)
            apiRequest("DELETE", "students2exams/delete", payload, loadTableFromCombo);
    }
    // Reloads table upon receiving a response from the server
}