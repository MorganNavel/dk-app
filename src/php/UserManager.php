<?php
/**
 * File containing a class to Manage the users
 * 
 * @author Morgan NAVEL <navelmorgan34@gmail.com>
 * 
 */
require_once "./DbManager.php" ;

/**
 * UserManager 
 * 
 * Permet de regrouper les requêtes lié à un utilisateur
 * 
 */
class UserManager
{
    private static $_cnx = null;
        
    /**
     * Login
     * 
     * Ask the database about the user with email and password given in params
     *
     * @param string $email
     * @param string $password
     * 
     * @return mixed
     */
    public static function login( $email, $password)
    {
        if (self::$_cnx != null) {
            try{
                $sql = "SELECT * FROM USERS where email:=email AND password:=password";
                $response = self::$_cnx->prepare($sql);
                $hashed = sha1($password);
                $response->execute(array('email'=>$email,'password'=>$hashed));
                $user = $response->fetch();
                if ($user) {
                    return $user;
                }
            }
            catch(PDOException $e){
                return -1;
            }
        } else {
            self::$_cnx = DbManager::getConnection();
            self::login($email, $password);
        }
    }    
    /**
     * GetUserById
     * 
     * Go through the database a search for a user with the email given in params
     *
     * @param string $email
     * 
     * @return int|null
     */
    public static function getUserById($email) 
    {
        if (self::$_cnx != null) {
            try{
                $sql = "SELECT * FROM USERS where email:=email";
                $response = self::$_cnx->prepare($sql);
                $response->execute(array('email'=>$email));
                $user = $response->fetch();
                if ($user) {
                    return $user;
                }
            }
            catch(PDOException $e){
                return -1;
            }
        } else {
            self::$_cnx = DbManager::getConnection();
            return self::getUserById($email);
        }
    }

    
    /**
     * AddUser
     * Add a new user to the database
     * 
     * @param string $email
     * @param string $name
     * @param string $password
     * 
     * @return int|null
     */
    public static function addUser($email, $name, $password)
    {
        if (self::$_cnx != null) {
            try{
                $hashed = sha1($password);
                $sql = "INSERT INTO USERS(email,name,password) VALUES(:email,:name,:password)";
                $response = self::$_cnx->prepare($sql);
                $array = array('email'=>$email,'name'=> $name,'password'=>$hashed);
                $response->execute($array);
                echo "<h1>Vous avez été enregistré correctement<h1>";
                return 0;
            }
            catch(PDOException $e){
                return -1;
            }
        } else {
            self::$_cnx = DbManager::getConnection();
            self::addUser($email, $name, $password);
        }
    }    
    /**
     * IsConnected
     * If connection is not null then return true else false
     *
     * @return bool
     */
    public static function isConnected()
    {
        return self::$_cnx !== null ;
    }
}
?>