/* Loads the exam table into tableDiv
exams: object[]: Array of Exam objects
*/
function loadExamTable(exams)
{
    cleanDateTime = function(dateTime)
    {
        dateTime = dateTime.replace("T", " ");
        dateTime = dateTime.split(".")[0];
        return dateTime;
    }
    for (var i = 0; i < exams.length; i++)
    {
        exams[i].opensClean = cleanDateTime(exams[i].opens);
        exams[i].closesClean = cleanDateTime(exams[i].closes);
    }
    let headers = ["Name", "Opening Time", "Closing Time"];
    let keys = ["name", "opensClean", "closesClean"];
    let table = makeTable(TABLE_CRUD, headers, keys, exams, modifyExam, deleteExam);
    table.attr("id", "examTable");
    $(tableDiv).append(table);
}

/* Loads the div for modifying the given exam by id
id: int: Database ID for the given exam
*/
function modifyExam(id)
{
    window.alert("modify" + id);
}

/* Deletes the selected exam from the database
id: int: Database ID for the given exam
*/
function deleteExam(id)
{
    window.alert("delete" + id);
}

loadExamTable(unitTests.exams);