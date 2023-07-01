<?php 
session_start();
if(!empty($_POST["name"]) && !empty($_POST["email"]) && !empty($_POST["password"]) && !empty($_POST["confirm_password"])){
    $_SESSION["name"] = $_POST["name"];
    $_SESSION["email"] = $_POST["email"];
    $_SESSION["password"] = $_POST["password"];
    ?>
    <h1>Bienvenue <?php echo $_POST["name"]?>!</h1>
    
    <?php
}else{
    ?>
    <h1>Error</h1>
    <?php
}
?>