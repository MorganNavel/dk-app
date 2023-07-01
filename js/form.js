window.onload = function () {
  const submit_btn = document.getElementById("submit_btn");
  const div_password = document.getElementById("div-password");
  submit_btn.disabled = true;
  div_password.addEventListener("input", function (e) {
    const password = document.getElementById("password");
    const confirm_password = document.getElementById("confirm_password");
    if ((password.value !== confirm_password.value) | (password.value == "")) {
      submit_btn.disabled = true;
      div_password.removeChild(div_password.lastChild);
      const error_div = document.createElement("div");
      const error_message = document.createElement("p");
      error_message.textContent =
        "Attention: Les mots de passes doivent être identiques";
      console.log(error_div);
      error_div.appendChild(error_message);
      div_password.appendChild(error_div);
    } else {
      submit_btn.disabled = false;
      if (div_password.lastChild != confirm_password) {
        div_password.removeChild(div_password.lastChild);
      }
    }
  });
};
