window.addEventListener("DOMContentLoaded", function () {
  const submit_btn = document.getElementById("submit_btn");
  const div_password = document.getElementById("div-password");
  submit_btn.disabled = true;

  div_password.addEventListener("input", function (event) {
    const password = document.getElementById("password");
    const confirm_password = document.getElementById("confirm-password");
    const error_div = document.getElementById("error-div");
    if ((password.value !== confirm_password.value) | (password.value == "")) {
      submit_btn.disabled = true;
      // console.log();
      if (error_div.children.length == 0) {
        const error_message = document.createElement("p");

        error_message.textContent =
          "Attention: Les mots de passes doivent être identiques";
        error_div.appendChild(error_message);
      }
    } else {
      submit_btn.disabled = false;
      if (div_password.lastChild != confirm_password) {
        error_div.removeChild(error_div.lastChild);
      }
    }
  });
});
