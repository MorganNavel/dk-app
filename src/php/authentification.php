<?php

/**
 *  @author FKLearning <navelmorgan34@gmail.com>
 *  @license Copyright (c) 2023 FKLearning - All Rights Reserved
 *  @copyright 2023 FKLearning
 *  Unauthorized copying of this file, via any medium is strictly prohibited
 *  Proprietary and confidential
 */

session_start();
require_once dirname(__FILE__)."/class/UserManager.php";

session_destroy();
/**
 * Check if a value is set
 *
 * @param  str $var
 * @return bool
 */
function isset_var($var)
{
    return $var !== null;
}
if (!isset_var($_SESSION["email"])) {

    if (isset_var($_POST["email"]) && isset_var($_POST["password"]) && isset_var($_POST["confirm_password"]) && isset_var($_POST["name"])) {

        $email = $_POST["email"];
        $password = $_POST["password"];
        $c_password = $_POST["confirm_password"];
        $name = $_POST["name"];
        if (!empty($email) && !empty($password) && !empty($c_password) && !empty($name)) {

            $res = UserManager::addUser($email, $name, $password);
            if ($res) {
                $_SESSION["email"] = $_POST["email"];
                echo "<h1>Vous avez été enregistré correctement<h1>";
                echo "<h1>Bienvenue ",$_POST["name"],"!</h1>";
            } else {
                echo "Error";
                //ERROR DUE TO DATABASE
                //SEND TO ERROR PAGE
            }
        } else {
            echo "<h1>Veuillez remplir tous les champs</h1>";
        }
        //If not set then it must be with less values
    } elseif (isset_var($_POST["email"]) && isset_var($_POST["password"])) {
        $email = $_POST["email"];
        $password = $_POST["password"];
        if (!empty($email) && !empty($password)) {
            $res = UserManager::login($email, $password);
            if ($res != -1) {
                $_SESSION["email"] = $_POST["email"];
                echo "<h1>Bienvenue ",$res["name"],"!</h1>";
            } else {
                echo "Error";
                //ERROR DUE TO DATABASE
                //SEND TO ERROR PAGE
            }
        } else {
            //Champs vide
            echo "<h1>Veuillez remplir tous les champs</h1>";
        }
    } else {
        //ERROR
    }
} else {
    //ALREADY LOGGED BY SESSION
}






?>