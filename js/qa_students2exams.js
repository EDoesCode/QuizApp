
$(document).ready(function() {
    data = null;
    comboNameKey = "name";
    directory = "students2exams";
    readData(loadDataTable, "students");
    readData(loadDataComboBox, "exams");
})

/* Loads the student table into tableDiv
students: object[]: Array of Student objects
*/
function loadTable(students)
{
    let headers = ["ID", "First Name", "Last Name"];
    let keys = ["id", "firstname", "lastname"];
    let table = makeTable(TABLE_CHECK, headers, keys, students);
    table.attr("id", "studentTable");
    buildSearchAddBar();
    $(tableDiv).append(table);
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