function qaLogin() {
  var email_str = document.getElementById("InputEmail").value;
  var unhashed_password_str = document.getElementById("InputPassword").value;

  window.location.assign(window.location.hostname + "/qa_index");
  return false;
}
