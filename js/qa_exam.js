
$(document).ready(function() {
    $(addDiv).hide();
    data = null;
    directory = "exams";
    var upperCaseDirectory = directory.charAt(0).toUpperCase()+directory.substring(1);
    $(pageTitle).html(upperCaseDirectory);
    readData();
    jumpToCreate();
})

/* Loads the exam table into tableDiv
exams: object[]: Array of Exam objects
*/
directory = "exams";

function loadTable(exams)
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
    buildSearchAddBar();
}

/* Populates the fields of the data entry form when modifying an existing entry.  Each page needs this function
curData: Exam: data object to populate the fields with
*/
function populateFields(curData)
{
    // For an altogether incomprehensible reason, "name" cannot be an ID?
    $(title).val(curData.name);
    $(opens).val(curData.opensClean);
    $(closes).val(curData.closesClean);
}

function getDataObject()
{
    var dataObj = {};
    dataObj.name = $(title).val();
    dataObj.opens = $(opens).val();
    dataObj.closes = $(closes).val();
    console.log(dataObj);
    if (!dataObj.name)
        throw "Exam must have a name."
    if (!dataObj.opens || !dataObj.closes)
        throw "Exam must have an open and start time."
    return dataObj;
}