/* Loads the exam table into tableDiv
questions: object[]: array of Question objects;
*/
function loadTable(questions)
{
    let headers = ["Question", "Answer"];
    let keys = ["question", "answer"];
    let table = makeTable(TABLE_CRUD, headers, keys, questions, modifyQuestion, deleteQuestion);
    table.attr("id", "questionTable");
    $(tableDiv).append(table);
}

/* Loads the div for modifying the given question by id
id: int: Database ID for the given question
*/
function modifyQuestion(id)
{
    window.alert("modify" + id);
}

/* Deletes the selected question from the database
id: int: Database ID for the given question
*/
function deleteQuestion(id)
{
    window.alert("delete" + id);
}

loadQuestionTable(unitTests.questions);