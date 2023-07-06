window.addEventListener("DOMContentLoaded", function (e) {
  console.log("header.js loaded!");

  const li_menu = document.getElementById("li_entrainement");
  console.log(li_menu);
  const div_category = document.getElementById("menu_panel");

  li_menu.addEventListener("mouseover", function (e) {
    if (div_category.style.display == "") {
      console.log(div_category.style.display);
      div_category.style.display == "grid";
      console.log(div_category.style.display);
    } else {
      div_category.style.display == "";
    }
  });
});
