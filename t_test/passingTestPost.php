<?php
include "define.php";
date_default_timezone_set('America/Vancouver');
$timestamp = strtotime("now");
//author data

$author_info = "ISP/IP: ".$_SERVER['REMOTE_ADDR']."\n";
$author_info .= "Browser info ".addslashes($_SERVER['HTTP_USER_AGENT']);
//Creates Array
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
//SQL
$con = mysql_connect(SQL_HOST, SQL_USER, SQL_PASS);
// Check connection
if (!$con){echo "Failed to connect to MySQL:(<br>";}

$db_select = mysql_select_db(SQL_DBNAME); 
  if(!$db_select){echo "COULD NOT SELECT DB<br>";}
echo "<br>";

if (mysql_num_rows(mysql_query("SHOW TABLES LIKE 'Alerts'")) == 0) {
	echo "CREATING FOR Alerts!<br>";
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
$insert = ("INSERT INTO Alerts (districtID, title, timestamp, content, authorInfo) VALUES ('".$data['districtNum']."','" .$data['title']."','".$data['timestamp']. "','".$data['content']."','".$data['authorInfo']."')");
$sql_insert = mysql_query($insert);


if (!$sql_insert){echo "COUNLD NOT INSERT<br>";echo $insert;echo $data['type'];};

//header( 'Location: http://www.poliapp.comli.com' ) ;
?>

