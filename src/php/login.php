<?php
session_start();
require_once "./UserManager.php";
if(!empty($_POST["email"]) && !empty($_POST["password"])){
    if(UserManager::getUserById($_POST["email"],$_POST["password"])!=-1){
        $_SESSION["email"] = $_POST["email"];
        $_SESSION["password"] = sha1($_POST["password"]);
        echo "<h1>Bienvenue ",$_POST["name"],"!</h1>";
    }else{
        echo "<h1>Erreur email ou mot de passe incorrect</h1>";
    }
}else{
    echo "<h1>Veuillez remplir tous les champs</h1>";
}
?>