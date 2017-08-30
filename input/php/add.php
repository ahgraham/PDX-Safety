<?php
//Includes
include 'config.php';
include 'functions.php';
include 'auth.php';

//DOOO ITTT
			

/*
FUNCTIONS
*/
function htmlformadd (){
	$htmlString = "<!DOCTYPE html>
			<html>
				<head>
					<link rel='icon' href='../img/favicon.ico' />
					<link rel='stylesheet' href='js-style/style.css' />	
					<script type='text/javascript' src='js-style/jquery-1.9.1.min.js'></script>
					<script type='text/javascript' src='js-style/jsAdd.js'></script>		
	</head>
		<body>
		<div id='lightboxentry'>
			<div id='logo' align='left'>
				 <img src='../img/logo.png' alt='logo' height='36' width='150'> 
			</div>
			<div id='addForm' align='left'>
				
				<form name='myForm' action='add.php' method='post'>
				PLEASE SIGN UP:<br>
				<input type='hidden' name='add' value='true'>
				Email:<br> <input type='text' autocomplete='off' name='email'><br>
				Username:(Badge #)<br> <input type='text' autocomplete='off' name='username'><br>
				Your Name:<br> <input type='text' autocomplete='off' name='realname'><br>
				Create Login Password:<br> <input type='password' name='password1'><br>
				Retype Login Password:<br> <input type='password' name='password2'><br>
				--------------------------------------------------------------<br>
				Registration Password:<br> <input type='password' name='pass'><br>
				<input type='submit' value='Submit'><br>
				</form>
			</div>

		
		</div>		

		</body>
	</html>";

echo $htmlString;
}
/*
function enter(){
	include "../config.php";
	$password1 = addslashes($_POST['password1']);
	$password2 = addslashes($_POST['password2']);
	$escUsr = addslashes($_POST['username']);
	$email = addslashes($_POST['email']);
	$hash1 = hash('sha256',$password1);
	$hash2 = hash('sha256',$password2);
	$uninportantString = 'pdxsafety503';

	if(!(addslashes($_POST['pass']) === $uninportantString)){
		echo ("<!DOCTYPE html><html><body><script> window.alert('You need Permision. (Allow password required)'); </script><meta HTTP-EQUIV='REFRESH' content='0; ".LINK_ADDACC."'></body></html>");
		exit;
	}

	if ($hash1 === $hash2){
		$con = mysql_connect(SQL_HOST, SQL_USER, SQL_PASS);
	}
	





	$db_select = mysql_select_db(SQL_DBNAME); 
	if(!$db_select){echo "COULD NOT SELECT DB<br>";}

	$sql_insert = mysql_query("INSERT INTO login (username,password,email) VALUES ('".$escUsr. "','" .$hash1."','".$email."')");
	if (!$sql_insert){
		echo "COUNLD NOT INSERT<br>";
	} else {
		echo ("<!DOCTYPE html><html><body><script> window.alert('Passwords are not the same'); </script><meta HTTP-EQUIV='REFRESH' content='0; ".LINK_ADDACC."'></body></html>");
	};
	if ($sql_insert){
		echo ("<!DOCTYPE html><html><body><script> window.alert('Account made'); </script><meta HTTP-EQUIV='REFRESH' content='0; ".INPUT_REDIRECT."'></body></html>");
	}

}*/

function auth_redirect(){
	if(auth() === true){
		header( 'Location: http://input.pdxsafety.org/' );
	}else{
		header( 'Location: http://input.pdxsafety.org/php/add.php' );		
	}
	
}

if((auth() === true)&&(!$_POST['add'])){
		auth_redirect();
	} 
	
	if($_POST['add']){
		add_account($_POST);
	}else {
		htmlformadd();
	}

?>
