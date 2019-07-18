/* Loads the student table into tableDiv
students: object[]: Array of Student objects
*/
function loadStudentTable(students)
{
    // Replacing "true" and "false" strings with "yes" and "no"
    for (var i = 0; i < students.length; i++)
        students[i].isAdminClean = (students[i].isAdmin == "true" ? "Yes" : "No")
    let headers = ["First Name", "Last Name", "Email", "Admin?"];
    let keys = ["firstname", "lastname", "email", "isAdminClean"];
    let table = makeTable(TABLE_CRUD, headers, keys, students, modifyStudent, deleteStudent);
    table.attr("id", "studentTable");
    $(tableDiv).append(table);
}

/* Loads the div for modifying the given student by id
id: int: Database ID for the given student
*/
function modifyStudent(id)
{
    window.alert("modify" + id);
}

/* Deletes the selected student from the database
id: int: Database ID for the given student
*/
function deleteStudent(id)
{
    window.alert("delete" + id);
}

loadStudentTable(unitTests.students);