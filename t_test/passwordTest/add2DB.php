<?php
include "../define.php";
$password1 = addslashes($_POST['password1']);
$password2 = addslashes($_POST['password2']);
$escUsr = addslashes($_POST['username']);
$hash1 = hash('sha256',$password1);
$hash2 = hash('sha256',$password2);

if ($hash1 === $hash2){
	$con = mysql_connect(SQL_HOST, SQL_USER, SQL_PASS);
	// Check connection
	if (!$con){echo "Failed to connect to MySQL:(<br>";}

	$db_select = mysql_select_db(SQL_DBNAME); 
	if(!$db_select){echo "COULD NOT SELECT DB<br>";}

	$sql_insert = mysql_query("INSERT INTO login (username,hash) VALUES ('".$escUsr. "','" .$hash1."')");
	if (!$sql_insert){echo "COUNLD NOT INSERT<br>";};
} else {
echo "please make sure passwords are the same.";
};
?>
