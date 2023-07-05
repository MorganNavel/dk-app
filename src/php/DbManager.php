<?php

/**
 *  @author FKLearning <navelmorgan34@gmail.com>
 *  @license Copyright (c) 2023 FKLearning - All Rights Reserved
 *  @copyright 2023 FKLearning
 *  Unauthorized copying of this file, via any medium is strictly prohibited
 *  Proprietary and confidential
 */

include './config.php';

//define CONFIG VARIABLES
define("DB_NAME", $CONFIG["DB_NAME"]);
define("DB_HOST", $CONFIG["DB_HOST"]);
define("DB_USERNAME", $CONFIG["DB_USERNAME"]);
define("DB_PASSWORD", $CONFIG["DB_PASSWORD"]);



class DbManager
{
    public const HOST = DB_HOST;
    public const DBNAME = DB_NAME;
    public const USERNAME = DB_USERNAME;
    public const PASSWORD = DB_PASSWORD;
    private static $_cnx = null;
    
    /**
     * Get a databas connection
     *
     * @return PDO|int
     */
    public static function getConnection() {
        if (self::$_cnx==null) {
            try{
                $URL = "mysql:host=".self::HOST.";dbname=".self::DBNAME;
                self::$_cnx = new PDO($URL, self::USERNAME, self::PASSWORD);
                self::$_cnx ->setAttribute(PDO::ATTR_EMULATE_PREPARES, false);
                self::$_cnx->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
            }
            catch(PDOException $e){
                return -1;
            }
        }
        return self::$_cnx;
    }    
    /**
     * Allow to test the class by injecting a debug database
     *
     * @param  string $DB_NAME
     * 
     * @return PDO|int
     */
    public static function injectConnection($DB_NAME) 
    {
        try{
            $URL = "mysql:host=".self::HOST.";dbname=".$DB_NAME;
            self::$_cnx = new PDO($URL, self::USERNAME, self::PASSWORD);
            self::$_cnx ->setAttribute(PDO::ATTR_EMULATE_PREPARES, false);
            self::$_cnx->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
            echo "Connexion réussi";
        }
        catch(PDOException $e){
            // ERROR PAGE
            return -1;
        }
        return self::$_cnx;
    }
}
?>



