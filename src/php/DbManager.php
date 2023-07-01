<?php
$config = parse_ini_file(".env");
define("DB_HOST",$config["DB_HOST"]);
define("DB_NAME",$config["DB_NAME"]);
define("DB_USERNAME",$config["DB_USERNAME"]);
define("DB_PASSWORD",$config["DB_PASSWORD"]);

class DbMangager{
    public const HOST = DB_HOST;
    public const DBNAME = DB_NAME;
    public const USERNAME = DB_USERNAME;
    public const PASSWORD = DB_PASSWORD;
    private static $cnx = null;
    public function getUsername(){
        return self::DBNAME;
    } 
}
?>