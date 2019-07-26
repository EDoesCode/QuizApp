$(document).ready(function() {
    $(addDiv).hide();
    data = null;
    directory = "questions";
    readData();
})

/* Loads the exam table into tableDiv
questions: object[]: array of Question objects;
*/
function loadTable(questions)
{
    // Getting correct answer from answers
    for (var i = 0; i < questions.length; i++)
    {
        let curQuestion = questions[i];
        let answerLetter = curQuestion.answer.toLowerCase();
        curQuestion.fullAnswer = curQuestion[answerLetter];
    }
    let headers = ["Question", "Answer"];
    let keys = ["question", "fullAnswer"];
    let table = makeTable(TABLE_CRUD, headers, keys, questions);
    table.attr("id", "questionTable");
    $(tableDiv).append(table);
    buildSearchAddBar();
}

/* Populates the fields of the data entry form when modifying an existing entry.  Each page needs this function
curData: Question: data object to populate the fields with
*/
function populateFields(curData)
{
    if (curData === null)
        return;
    $(question).val(curData.question);
    $(answerA).val(curData.a);
    $(answerB).val(curData.b);
    $(answerC).val(curData.c);
    $(answerD).val(curData.d);
    $(answerE).val(curData.e);
    $("input[name=answer][value=" + curData.answer+"]").prop('checked', true);
}

function getDataObject()
{
    var dataObj = {};
    dataObj.question = $(question).val();
    if (dataObj.question === "")
        throw "Question must have a question body.";
    dataObj.a = $(answerA).val();
    dataObj.b = $(answerB).val();
    dataObj.c = $(answerC).val();
    dataObj.d = $(answerD).val();
    dataObj.e = $(answerE).val();
    var answers = [dataObj.a, dataObj.b, dataObj.c, dataObj.d, dataObj.e];
    dataObj.numberchoices = 0;
    for (var i = 0; i < answers.length; i++)
    {
        dataObj.numberchoices++;
    }
    dataObj.answer =  $("input[name=answer]:checked").val();
    if (!dataObj[dataObj.answer])
        throw "Selected answer cannot be blank.";
    console.log(dataObj);
    return dataObj;
}