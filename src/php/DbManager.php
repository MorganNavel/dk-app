<?php

include './config.php';
define("DB_NAME",$CONFIG["DB_NAME"]);
define("DB_HOST",$CONFIG["DB_HOST"]);
define("DB_USERNAME",$CONFIG["DB_USERNAME"]);
define("DB_PASSWORD",$CONFIG["DB_PASSWORD"]);


class DbManager{
    public const HOST = DB_HOST;
    public const DBNAME = DB_NAME;
    public const USERNAME = DB_USERNAME;
    public const PASSWORD = DB_PASSWORD;
    private static $cnx = null;

    public static function getConnexion(){
        if(self::$cnx==null){
            try{
                self::$cnx = new PDO("mysql:host=".self::HOST.";dbname=".self::DBNAME, self::USERNAME, self::PASSWORD);
                self::$cnx ->setAttribute(PDO::ATTR_EMULATE_PREPARES, false);
                self::$cnx->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
            }
            catch(PDOException $e){
                echo "Erreur: ".$e->getMessage();
            }
        }
        return self::$cnx;
    }
    public static function injectConnexion($DB_NAME){
        try{
            self::$cnx = new PDO("mysql:host=".self::HOST.";dbname=".$DB_NAME, self::USERNAME, self::PASSWORD);
            self::$cnx ->setAttribute(PDO::ATTR_EMULATE_PREPARES, false);
            self::$cnx->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
            echo "Connexion réussi";
        }
        catch(PDOException $e){
            echo "Erreur: ".$e->getMessage();
        }
        return self::$cnx;
    }
}
?>



