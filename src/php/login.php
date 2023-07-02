<?php
session_start();
require_once "./UserManager.php";
if(!empty($_POST["email"]) && !empty($_POST["password"])){

    if(UserManager::addUser($_POST["email"],$_POST["name"],$_POST["password"])!=-1){
        $_SESSION["name"] = $_POST["name"];
        $_SESSION["email"] = $_POST["email"];
        $_SESSION["password"] = $_POST["password"];
        echo "<h1>Bienvenue ",$_POST["name"],"!</h1>";
    }else{
        echo "<h1>Adresse email ou nom déjà utilisé</h1>";
    }
}else{
    echo "<h1>Veuillez remplir tous les champs</h1>";
}
?>