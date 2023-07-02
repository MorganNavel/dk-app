<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>FKLearning</title>
    <!-- <script src="./js/header.js"></script> -->
    <script>
    var li_menu = document.getElementById("li_entrainement");
    var div_category = document.getElementById("menu_panel");

    function showCategory() {
        console.log("123")
        
        if(div_category.style.display=='none'){
            div_category.style.display=='block';
        }else{
            div_category.style.display=='none';
        }
    }
    </script>
</head>
<body>
<nav class="navbar">
    <div class="navbar__logo">
        <img src="./img/logo.png" width="120" alt="logo">
    </div>
    <div class="navbar__menu">
        <li id="li_entrainement"><a href="" onclick="showCategory()">Entraînement</a></li>
        <li><a href="">Participer</a></li>
        <li><a href="">Ma page</a></li>
        <li><a href="">Login</a></li>
    </div>
    <div class="navbar__language">
        <li>Langue</li>
        <li>
            <a href="">
                <img src="./img/flag-france.png" width="30" alt="FR">
            </a>
        </li>
        <li>
            <a href="">
                <img src="./img/flag-south-korea.png" width="30" alt="FR">
            </a>
        </li>
    </div>
</nav>
<div class="menu_panel" id="menu_panel">
    <div class="menu_category">
        <div class="category"><a href="">Cours</a></div>
        <div class="category"><a href="">Vocabulaire</a></div>
        <div class="category"><a href="">Expression</a></div>
    </div>
</div>
</body>
</html>