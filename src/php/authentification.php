<?php

session_start();
require_once "./UserManager.php";
var_dump($_POST["email"]);
var_dump($_POST["password"]);
var_dump($_POST["confirm_password"]);
var_dump($_POST["name"]);
var_dump($_SESSION["email"]=null);
session_destroy();
/**
 * Check if a value is set
 *
 * @param  mixe $var
 * @return bool
 */
function isset_var($var)
{
    return $var!==null;
}

if (!isset_var($_SESSION["email"])) {

    if (isset_var($_POST["email"]) && isset_var($_POST["password"]) && isset_var($_POST["confirm_password"] && isset_var($_POST["name"]))) {

        $email = $_POST["email"];
        $password = $_POST["password"];
        $c_password = $_POST["confirm_password"];
        $name = $_POST["name"];
        if (!empty($email) && !empty($password) && !empty($password)) {
            $res = UserManager::addUser($email, $name, $password);
            if ($res!=-1) {
                $_SESSION["email"] = $_POST["email"];
                $_SESSION["password"] = sha1($_POST["password"]);
                echo "<h1>Bienvenue ",$_POST["name"],"!</h1>";
            } else {
                //ERROR DUE TO DATABASE
                //SEND TO ERROR PAGE
            }
        } else {
            echo "<h1>Veuillez remplir tous les champs</h1>";
        }
    }
    //If not set then it must be with less values

    if (isset_var($_POST["email"]) && isset_var($_POST["password"]) ) {
        $email = $_POST["email"];
        $password = $_POST["password"];
        if (!empty($email) && !empty($password)) {
            $res = UserManager::getUserById($email);
            if ($res!=-1) {
                $_SESSION["email"] = $_POST["email"];
                echo "<h1>Bienvenue ",$_POST["name"],"!</h1>";
            } else {
                //ERROR DUE TO DATABASE
                //SEND TO ERROR PAGE
            }
        } else {
            //Champs vide
            echo "<h1>Veuillez remplir tous les champs</h1>";
        }
    } else {
        echo "ERROR";
    }
}
//ALREADY LOGGED BY SESSION





?>