<?php
include "config.php";
include "functions.php";

$id = addslashes($_POST['id']);

if (($id)){
	archive_post($id);
}



//FUNCTIONS
function archive_post($id){
	$con = connect_sql(SQL_DBNAME);
	$data = sql_get('*',SQL_ARCH,"id='".$id."'")  

	table_check_make(SQL_ARCH)	
	if (($data)&&(table_check_make(SQL_ARCH))){
		sql_post($data,SQL_ARCH);
	}else{
		echo redirect(1,"Could not archive.",$_SERVER['HTTP_REFERER'])
	}
 	

}
/*
function sql_get($select,$from,$where){
	$con = connect_sql(SQL_DBNAME);
	$query = "SELECT ".$select." FROM ".$from." WHERE ".$id."";
	$result  = mysql_query($query);
	if($result){
		$row = mysql_fetch_row($result);
	}
	return $row;
	
}*/


?>
