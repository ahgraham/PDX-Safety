<?php
include "../define.php";
$escUsr = addslashes($_POST['username']);
$escPass = addslashes($_POST['password']);
$inputHash = hash('sha256',$escPass);

$con = mysql_connect(SQL_HOST, SQL_USER, SQL_PASS);
// Check connection
if (!$con){echo "Failed to connect to MySQL:(<br>";}

$db_select = mysql_select_db(SQL_DBNAME); 
if(!$db_select){echo "COULD NOT SELECT DB<br>";}

$result = mysql_query("SELECT hash FROM login WHERE username = '".$escUsr."'")
or die(mysql_error());
if($result){
	$row = mysql_fetch_row($result);
	$sqlHash = $row[0];
}
if ($sqlHash === $inputHash){
	echo "LOGGED IN!!!";
} else {
	echo "Sorry wrong password or username.";
};
?>
