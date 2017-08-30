<?php
include "define.php";
date_default_timezone_set('America/Vancouver');
$timestamp = strtotime("now");
//author data
$
$author_info = "ISP/IP: ".$_SERVER['REMOTE_ADDR']."";
//Creates Array
/*
$data = array(
    "districtNum" => $_POST['district'],
    "title" => $_POST['title'],
    "authorName" => '',
    "timestamp" => $timestamp,
    "authorInfo" => $author_info,
    "content" => $_POST['content'], 
    "type" => $_POST['alertType'],  
    "priority" => '',
);
*/
//Hack to check without form
$data = array(
    "districtNum" => '620',
    "title" => 'First Post',
    "authorName" => '',
    "timestamp" => $timestamp,
    "authorInfo" => $author_info,
    "content" => 'This is the message', 
    "type" => 'BOLO',  
    "priority" => '',
);
//SQL
$con = mysql_connect(SQL_HOST, SQL_USER, SQL_PASS);
// Check connection
if (!$con){echo "Failed to connect to MySQL:(<br>";}

$db_select = mysql_select_db(SQL_DBNAME); 
  if(!$db_select){echo "COULD NOT SELECT DB<br>";}
echo "<br>";

if (mysql_num_rows(mysql_query("SHOW TABLES LIKE 'Alerts'")) == 0) {
	echo "CREATING FOR district_".$data['districtNum']."!<br>";
	$sql_make_table = mysql_query("CREATE TABLE Alerts (
		id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,		
		districtID INT(30),
		title CHAR(60),
		authorName CHAR(40),
		type CHAR(10),
		timestamp int(20),
		content text,
		authorInfo text,
		priority INT(20)
		)");

	if (!$sql_make_table){echo "COULD NOT CREATE TABLE<br>";}
}
$sql='INSERT INTO `Alerts` (`district id`,`category`,`title`,`content`,`author`,`time`,`priority`) ';
$sql.="VALUES ('$district_id','$category','$title','$content','$author','$time','$priority');";
$sql_insert = mysql_query($sql,$con);


if (!$sql_insert){echo "COUNLD NOT INSERT<br>";};

header( 'Location: http://www.poliapp.comli.com' ) ;
?>

