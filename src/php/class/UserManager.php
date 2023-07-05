<?php
/**
 *  @author FKLearning <navelmorgan34@gmail.com>
 *  @license Copyright (c) 2023 FKLearning - All Rights Reserved
 *  @copyright 2023 FKLearning
 *  Unauthorized copying of this file, via any medium is strictly prohibited
 *  Proprietary and confidential
 */


require_once dirname(__FILE__)."/DbManager.php";

class UserManager{
    private static $_cnx = null;
        
    /**
     * Login a user
     *
     * @param  string $email
     * @param  string $password
     * @return array|int
     */
    public static function login($email,$password)
    {
        if (self::$_cnx!=null) {
            try{

                $sql="SELECT * FROM USERS WHERE email=:email AND password=:password";

                $response = self::$_cnx->prepare($sql);
                $tab = array('email'=>$email,'password'=>sha1($password));

                $response->execute($tab);

                $user = $response->fetch();

                if ($user) {
                    return $user;
                } else {
                    // ERROR PAGE
                    return -1;
                }

            }
            catch(PDOException $e){
                print "Error: ".$e->getMessage();
                return -1;
            }
        } else {
            self::$_cnx = DbManager::getConnection();
            return self::login($email, $password);
        }
    }

    /**
     * Get a user
     *
     * @param  string $email
     * @return array|int
     */
    public static function getUserById($email)
    {
        if (self::$_cnx!=null) {
            try{
                $sql = "SELECT * FROM USERS where email:=email";
                $response = self::$_cnx->prepare($sql);
                $response->execute(array('email'=>$email));
                $user = $response->fetch();
                if ($user) {
                    return $user;
                } else {
                    // ERROR PAGE
                    return -1;
                }
            }
            catch(PDOException $e){
                // ERROR PAGE
                return -1;
            }
        } else {
            self::$_cnx = DbManager::getConnection();
            return self::getUserById($email);
        }
    }

    
    /**
     * addUser
     *
     * @param  string $email
     * @param  string $name
     * @param  string $password
     * @return int
     */
    public static function addUser($email, $name, $password)
    {
        if (self::$_cnx !=null) {
            try{
                $hashed = sha1($password);
                $sql = "INSERT INTO USERS(email,name,password) VALUES(:email,:name,:password)";
                $response = self::$_cnx->prepare($sql);
                $tab = array('email'=>$email,'name'=> $name,'password'=>$hashed);
                $response = $response->execute($tab);
                if ($response) {
                    return $response;
                } else {
                    return -1;
                }
            }
            catch(PDOException $e){
                return -1;
            }
        } else {
            self::$_cnx = DbManager::getConnection();
            return self::addUser($email, $name, $password);
        }
    }    
}
?>