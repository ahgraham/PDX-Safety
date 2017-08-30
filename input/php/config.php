<?php
/*
MySQL Defines
*/
		
//MySQL server address
define(SQL_HOST, "mysql.pdxsafety.org");		
//MySQL user
define(SQL_USER, "poliapp");		
//MySQL user password
define(SQL_PASS, "safecommunity503");		
//Alert Table Name
define(SQL_TABLE, "Alerts");
//Test Table Name
define(SQL_TESTTABLE, "Tests");
//Database name
define(SQL_DBNAME, "poliappdb");
//archive table
define(SQL_ARCHS, "archive");


/*
Other Config
*/

//Posting Password
define(INPUT_PASS, "a");

//Alert when post succeeds
define(INPUT_SUCCESS, "<script> window.alert('Your post succeeded!'); </script>");
//Alert when post fails
define(INPUT_FAIL, "<script> window.alert('Your post failed.'); </script>");

/*
LINKS
*/

//redirect after posting
define(INPUT_REDIRECT, "http:/input.pdxsafety.org/");
//add account link
define(LINK_ADDACC, "http://input.pdxsafety.org/php/add.php");
//authenticate/login
define(LINK_AUTH, "http://input.pdxsafety.org/php/auth.php");

?>
