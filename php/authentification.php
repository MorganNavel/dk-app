<?php 
session_start();
if(!empty($_POST["name"]) && !empty($_POST["email"]) && !empty($_POST["password"]) && !empty($_POST["confirm_password"])){
    ?>
    <h1>Bienvenue !</h1>
    
    <?php
}else{
    ?>
    <h1>Error</h1>
    <?php
}
?>