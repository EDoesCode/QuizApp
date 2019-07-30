
$(document).ready(function() {
    data = null;
    curExam = null;
    comboNameKey = "name";
    directory = "questions2exams";
    readAndLoadMappedData("exams", "questions");
})

/* Loads the question table into tableDiv
maps: object[]: Array of Question objects
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
    // Adding "mapped" variable to questions
    let headers = ["Question", "Answer", "Assigned?"];
    let keys = ["question", "fullAnswer", "mapped"];
    // Determining whether questions are mapped
    if (!mappingData)
    {
        console.log("Cannot load table; mapping data not loaded first.");
        return;
    }
    for (var i = 0; i < questions.length; i++)
    {
        let questionid = questions[i].id;
        // Getting map from student to exam
        var map = mappingData.find(function(element) {
            return (element.questionsid === questionid);
        });
        questions[i].mapped = (map !== undefined);
    }
    let table = makeTable(TABLE_CHECK, headers, keys, questions);
    table.attr("id", "questionTable");
    buildSearchAddBar();
    $("#openCreateModifyButton").remove();
    $(tableDiv).append(table);
    // No entries to create
    let button = $(document.createElement("button"));
    // Adding "Save Changes" button
    button.attr("onclick", "saveChanges()");
    button.html("Save Changes");
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
            return (element.questionsid == curID)
        })
        let payload = {
            questionsid: curID,
            examsid: $(comboBox).val()
        };
        // Map is not defined and data is checked (Create)
        if (map === undefined && curCheck)
            apiRequest("POST", "questions2exams/create", payload, loadTableFromCombo);
        // Map is defined and data is unchecked (Delete)
        if (map && !curCheck)
            apiRequest("DELETE", "questions2exams/delete", payload, loadTableFromCombo);
    }
    // Reloads table upon receiving a response from the server
}