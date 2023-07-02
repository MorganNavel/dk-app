<?php
require_once("./DbManager.php");

class UserManager{
    private static $cnx = null;
    
    public static function login($email,$password){
        if(self::$cnx!=null){
            try{
                $response = self::$cnx->prepare("SELECT * FROM USERS where email:=email AND password:=password");
                $response->execute(array('email'=>$email,'password'=>sha1($password)));
                $user = $response->fetch();
                if($user){
                    return $user;
                }
            }
            catch(PDOException $e){
                return -1;
            }
        }
        else{
            self::$cnx = DbManager::getConnexion();
            self::login($email,$password);
        }
    }
    public static function getUserById($email){
        if(self::$cnx!=null){
            try{
                $response = self::$cnx->prepare("SELECT * FROM USERS where email:=email");
                $response->execute(array('email'=>$email));
                $user = $response->fetch();
                if($user){
                    return $user;
                }
            }
            catch(PDOException $e){
                return -1;
            }
        }
        else{
            self::$cnx = DbManager::getConnexion();
            self::getUserById($email);
        }
    }


    public static function addUser($email,$name,$password){
        if(self::$cnx !=null){
            try{
                $hashedPassword = sha1($password);
                $response = self::$cnx->prepare("INSERT INTO USERS(email,name,password) VALUES(:email,:name,:password)");
                $response->execute(array('email'=>$email,'name'=> $name,'password'=>$hashedPassword));
                echo "<h1>Vous avez été enregistré correctement<h1>";
                return 0;
            }
            catch(PDOException $e){
                return -1;
            }
        }
        else{
            self::$cnx = DbManager::getConnexion();
            self::addUser($email,$name,$password);
        }
    }
    public static function isConnected(){
        return self::$cnx;
    }
}
?>