$("#navBar").html(
    `
    <nav class="navbar navbar-expand-sm navbar-dark bg-primary" style="background-color: #007BFF;">
      <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <a class="navbar-brand" href="#">QuizApp</a>

      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav mr-auto">
          <li class="nav-item dropdown" id="students">
            <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
              Students
            </a>
            <div class="dropdown-menu" aria-labelledby="navbarDropdown">
              <a class="dropdown-item" href="qa_student.html">View students</a>
              <a class="dropdown-item" href="qa_student.html#create">Create student</a>
              <a class="dropdown-item" href="qa_students2exams.html">Assign students to exam</a>
            </div>
          </li>
          <li class="nav-item dropdown">
            <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
              Exams
            </a>
            <div class="dropdown-menu" aria-labelledby="navbarDropdown">
              <a class="dropdown-item" href="qa_exam.html">View exams</a>
              <a class="dropdown-item" href="qa_exam.html#create">Create exam</a>
              <a class="dropdown-item" href="qa_students2exams.html">Assign students to exam</a>
              <a class="dropdown-item" href="qa_questions2exams.html">Assign questions to exam</a>
            </div>
          </li>
          <li class="nav-item dropdown">
            <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
              Questions
            </a>
            <div class="dropdown-menu" aria-labelledby="navbarDropdown">
              <a class="dropdown-item" href="qa_question.html">View questions</a>
              <a class="dropdown-item" href="qa_question.html#create">Add questions to pool</a>
              <a class="dropdown-item" href="qa_questions2exams.html">Assign questions to exam</a>
            </div>
          </li>
        </ul>
        <ul class="navbar-nav ml-auto">
          <li class="nav-item">
            <a class="nav-link" href="qa_login.html">Logout</a>
          </li>
        </ul>
      </div>
    </nav>
    `
);
