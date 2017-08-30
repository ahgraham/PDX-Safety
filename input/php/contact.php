<?php
if ($_POST['input']){
	include "config.php";
	include "functions.php";	
	//data stuff 
	date_default_timezone_set('America/Vancouver');
	$timestamp = strtotime("now");
	//author data
	
	$author_info = "ISP/IP: ".$_SERVER['REMOTE_ADDR']."\n";
	$author_info .= "Browser info ".addslashes($_SERVER['HTTP_USER_AGENT']);
	//Creates Array
	
	$data = array(
	    "districtNum" => $_POST['district'],
	    "title" => $_POST['title'],
	    "password" => "",
	    "authorName" => $_POST['author'],
	    "timestamp" => $timestamp,
	    "authorInfo" => $author_info,
	    "content" => $_POST['content'], 
	    "type" => $_POST['alertType'],
	    "subType" => $_POST['subType'],
	    "caseNum" => $_POST['caseNum'],  
	    "priority" => '',
	);
;
	$htmlfailstring = "<!DOCTYPE html><html><body>".INPUT_FAIL."<meta HTTP-EQUIV='REFRESH' content='0; ".INPUT_REDIRECT."'></body></html>";
	$htmlsuccessstring = "<!DOCTYPE html><html><body><p>".INPUT_SUCCESS."</p><meta HTTP-EQUIV='REFRESH' content='0; 	".INPUT_REDIRECT."'></body></html>"; 
	/*
	SQL STUFF
	*/


	// Check connection
	if (!connect_sql(SQL_DBNAME)){
		echo $htmlfailstring;
		exit;
	}
	if (!sql_post($data,SQL_TABLE)){
		echo $htmlfailstring;
		exit;
	}else{
		echo $htmlsuccessstring;
	}
}

if($_POST['archive']){
	include "functions.php";
	$id = addslashes($_POST['id']);
	archive_post($id);
}

?>
