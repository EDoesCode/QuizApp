$("#navBar").html(
    `
    <nav class="navbar navbar-expand-sm navbar-light bg-light">
      <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <a class="navbar-brand" href="#">QuizApp</a>

      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav mr-auto">
          <li class="nav-item" id="students">
            <a class="nav-link" href="qa_index.html">Students</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="qa_exam.html">Exams</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="qa_question.html">Questions</a>
          </li>
        </ul>
        <ul class="navbar-nav ml-auto">
          <li class="nav-item">
            <a class="nav-link" href="#">Logout</a>
          </li>
        </ul>
      </div>
    </nav>
    `
);

