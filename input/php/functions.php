<?php
include "config.php";
//include "auth.php";

if (!function_exists('check_pass')) {
function check_pass($data){
	if ($data['title'] && $data['content'] && $data['password']){
		if ($data['password'] == INPUT_PASS){
			return true;
		}else {
			return null;
		}
	}
}
}

if (!function_exists('sql_get')) {
function sql_get($select,$from,$where){
	$con = connect_sql(SQL_DBNAME);
	$query = "SELECT ".$select." FROM ".$from." WHERE ".$id."";
	$result  = mysql_query($query);
	if($result){
		$row = mysql_fetch_row($result);
	}
	return $row;
	
}
}

if (!function_exists('archive_post')) {
function archive_post($id){
	$con = connect_sql(SQL_DBNAME);
	$queryUpdate = "UPDATE ".SQL_TABLE." SET archive='1' WHERE id=".$id."";
	$result = mysql_query($queryUpdate);
	return $result;
}
}

if (!function_exists('cron_archive_post')) {
function cron_archive_post(){
	$twoWeekTimeStamp = strtotime("now") - 1209600;
	$con = connect_sql(SQL_DBNAME);
	$queryUpdate = "UPDATE ".SQL_TABLE." SET archive='1' WHERE timestamp<=".$twoWeekTimeStamp."";
	$result = mysql_query($queryUpdate);
	return $result;
}
}

if (!function_exists('add_account')) {
function add_account($data){
	include "../config.php";
	$password1 = addslashes($data['password1']);
	$password2 = addslashes($data['password2']);
	$escUsr = addslashes($data['username']);
	$name = addslashes($data['realname']);
	$email = addslashes($data['email']);
	$hash1 = hash('sha256',$password1);
	$hash2 = hash('sha256',$password2);
	$uninportantString = 'pdxsafety503';

	if(!(addslashes($data['pass']) === $uninportantString)){
		echo redirect(1,"Please make sure entry password is correct.",LINK_ADDACC);
		exit;
	}

	if ($hash1 === $hash2){
		$con = mysql_connect(SQL_HOST, SQL_USER, SQL_PASS);
		$db_select = mysql_select_db(SQL_DBNAME);
	}else{
		echo redirect(1,"Passwords do not match.",LINK_ADDACC);
	}
	
	 
	

	$sql_insert = mysql_query("INSERT INTO login (username,name,password,email) VALUES ('".$escUsr. "','" .$name."','" .$hash1."','".$email."')");

	if ($sql_insert){
		echo redirect(1,"Account made!",INPUT_REDIRECT);	
	}else{
		echo redirect(1,"Problem making account.",LINK_ADDACC);
	}

}
}

if (!function_exists('table_check_make')) {
function table_check_make($table){
	if (mysql_num_rows(@mysql_query("SHOW TABLES LIKE '".$table."'")) == 0) {   //Alerts
		$sql_make_table = @mysql_query("CREATE TABLE '".$table."' (
			id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,		
			districtID INT(30),
			title CHAR(60),
			type CHAR(10),
			subType VARCHAR (30),
			timestamp int(20),
			content text,
			authorInfo text,
			caseNum text,
			priority INT(20)
			)");
	
	}
}
}
/*
function authen(){
	if (auth()){
		return true;
	}else{
		return false;
	}
}

function sql_post($data,$table){
$insert = ("INSERT INTO ".$table." (districtID, title, type, subType, timestamp, content, caseNum, authorInfo) 
VALUES (
'".$data['districtNum']."',
'".$data['title'] . "',
'".$data['authorName']."',

'".$data['type']."',
'".$data['subType']."',
'".$data['timestamp']. "',
'".$data['content']."',
'".$data['caseNum']."',

'".$data['districtNum']."',
'".$data['authorName']."',
'".$data['title'] . "',
'".$data['type']."',
'".$data['timestamp']. "',
'".$data['content']."',
'".$data['caseNum']."',
'".$data['authorInfo']."'




)");
$sql_insert = mysql_query($insert);
return $sql_insert;
}*/

if (!function_exists('sql_post')) {
function sql_post($data,$table){
$insert = ("INSERT INTO ".$table." (districtID, authorName, title, type, subType, timestamp, content, caseNum, authorInfo) 
VALUES (
'".$data['districtNum']."',
'".$data['authorName']."',
'".$data['title'] . "',
'".$data['type']."',
'".$data['subType']."',
'".$data['timestamp']. "',
'".$data['content']."',
'".$data['caseNum']."',
'".$data['authorInfo']."'
)");
$sql_insert = mysql_query($insert);
return $sql_insert;
}
}

if (!function_exists('connect_sql')) {
function connect_sql($db){
	$con = mysql_connect(SQL_HOST, SQL_USER, SQL_PASS);
	$db_select = mysql_select_db($db);
	return $db_select; 
	
}
}

if (!function_exists('redirect')) {
function redirect($type,$message,$link){
	if($type === 1){
		$html = "<!DOCTYPE html><html><body><script> window.alert('".$message."'); </script><meta HTTP-EQUIV='REFRESH' content='0; ".$link."'></body></html>";
	}else{
		$html = "<!DOCTYPE html><html><body><meta HTTP-EQUIV='REFRESH' content='0; ".$link."'></body></html>";	
	}
	return $html;

}
}

?>