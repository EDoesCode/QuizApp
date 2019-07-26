
$(document).ready(function() {
    data = null;
    curExam = null;
    comboNameKey = "name";
    directory = "students2exams";
    //readData(loadDataComboBox, "exams");
    //readData(loadDataTable, "students");
    loadDataComboBox(unitTests.exams);
    readData(loadDataTable, "students");
    $(openCreateModifyButton).remove();
})

/* Loads the student table into tableDiv
students: object[]: Array of Student objects
*/
function loadTable(students)
{
    let headers = ["ID", "First Name", "Last Name", "Assigned?"];
    let keys = ["id", "firstname", "lastname", "mapped"];
    console.log(students[0]);
    let table = makeTable(TABLE_CHECK, headers, keys, students);
    table.attr("id", "studentTable");
    buildSearchAddBar();
    $(tableDiv).append(table);
    let button = $(document.createElement("button"));
    button.attr("onclick", "saveMapping");
    button.html("Save Changes");
    $(tableDiv).append(button);
}

function getDataObject()
{
    var dataObj = {};
    dataObj.name = $(title).val;
    dataObj.opens = $(opens).val;
    dataObj.closes = $(closes).val;
    if (!dataObj.name)
        throw "Exam must have a name."
    if (!dataObj.opens || !dataObj.closes)
        throw "Exam must have an open and start time."
    return dataObj;
}