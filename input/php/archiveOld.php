#!/usr/local/bin/php -q
<?php
include "config.php";
include "functions.php";

cron_archive_post();
echo "php archive ran";

/*function table_check_make($table){
	global $con;
	if (mysqli_query($con,"SELECT 1 from `$table`") === FALSE) {
		$currentSQL = "CREATE TABLE `$table` (
			id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,		
			districtID INT(30),
			title CHAR(60),
			authorName CHAR(40),
			`type` CHAR(10),
			subType VARCHAR(30),
			timestamp int(20),
			content text,
			authorInfo text,
			caseNum text,
			priority INT(20)
			)";
		$sql_make_table = mysqli_query($con,$currentSQL);
	}
}
//MySQL information
$mysql_host='mysql.pdxsafety.org';
$mysql_user='poliapp';
$mysql_passwd='safecommunity503';
$mysql_dbname='poliappdb';
$con=mysqli_connect($mysql_host,$mysql_user,$mysql_passwd,$mysql_dbname);
// Check connection
if (mysqli_connect_errno())
  {
  echo "Failed to connect to MySQL: " . mysqli_connect_error();
  }
//End MySQL connection
// Fixes bug where json is null
mysqli_query($con, 'SET CHARACTER SET utf8');
date_default_timezone_set('America/Vancouver');
$currentTime = strtotime("now");
//echo $currentTime;
// 60 * 60 * 24 * 7 * 2 is two weeks
table_check_make("Archive_Alerts");
$sql = "INSERT INTO `Archive_Alerts` (districtID, title, authorName, type, subType, timestamp, content, authorInfo, caseNum, priority) SELECT districtID, title, authorName, type, subType, timestamp, content, authorInfo, caseNum, priority FROM `Alerts` WHERE ($currentTime-timestamp) > (60 * 60 * 24 * 7 * 2)";
//echo $sql;
$result = mysqli_query($con, $sql);
$sql = "DELETE FROM `Alerts` WHERE ($currentTime-timestamp) > (60 * 60 * 24 * 7 * 2)";
mysqli_query($con, $sql);
mysqli_close($con);*/
?>
