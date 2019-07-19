/* Loads the exam table into tableDiv
exams: object[]: Array of Exam objects
*/
directory = "exams";
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
    let table = makeTable(TABLE_CRUD, headers, keys, exams);
    table.attr("id", "examTable");
    $(tableDiv).append(table);
}

loadExamTable(unitTests.exams);