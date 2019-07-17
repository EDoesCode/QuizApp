function qaLogin() {
  var email_str = document.getElementById("InputEmail").value;
  var unhashed_password_str = document.getElementById("InputPassword").value;

  window.location.assign("/qa_exam.html");
  return false;
}
