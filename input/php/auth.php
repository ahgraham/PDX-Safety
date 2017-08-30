<?php
//Includes
include 'config.php';

/*
FUNCTIONS
*/
if (!function_exists('htmlformauth')) {
function htmlformauth (){
	$htmlStringAuth = "<!DOCTYPE html>
			<html>
				<head>
					<link rel='icon' href='../img/favicon.ico' />
					<link rel='stylesheet' href='js-style/style.css' />	
					<script type='text/javascript' src='js-style/jquery-1.9.1.min.js'></script>
					<script type='text/javascript' src='js-style/jsAuth.js'></script>		
				</head>
		<body>
		<div id='dContent'> </div>
		<div id='lightbox'>
			<div id='logo' align='left'>
				 <img src='../img/logo.png' alt='logo' height='36' width='150'>
			</div>
			<div id='form'>
				<form name='InputForm' action='auth.php' method='post'>
				<input type='hidden' name='login' value='True'>
				Username: <br><input type='text' autocomplete='off' name='user'><br>
				Password: <br><input type='password' name='pass'><br>
				<input type='submit' value='Submit'> <br><br>
				<a href='add.php'> Register Here </a>
				</form>
			</div>

		
		</div>		

		</body>
	</html>";

echo $htmlStringAuth;
}
}


if (!function_exists('login')) {
function login(){
	$login = array(
	"username" => addslashes($_POST['user']),
	"hash" => hash('sha256',(addslashes($_POST['pass']))),
	);
	
	//global $user = $_POST['user'];
	
	$con = mysql_connect(SQL_HOST, SQL_USER, SQL_PASS);
	$db_select = mysql_select_db(SQL_DBNAME);

	$cmd = "SELECT password FROM login WHERE username= '".$login['username']."'";
	$result = mysql_query($cmd);
	$hash = null;
	if($result){
		$row = mysql_fetch_row($result);
		$hash = $row[0];
	}

	$query = "SELECT name FROM login WHERE username='".$login['username']."'";
	$result = mysql_query($query);
	if($result) {
	    $row = mysql_fetch_row($result);
	    $name = $row[0];
	}

	if ($login['hash'] === $hash){
		$_SESSION['user'] = addslashes($_POST['user']);
		$_SESSION['name'] = $name;
		$_SESSION['secretLogin'] = true;
		return true;
	}else{
		return false;
	}
}
}

if (!function_exists('auth')) {
function auth(){
	if ($_SESSION['secretLogin'] === true){
		return true;
	}else{
		return false;
	}
}
}

if (!function_exists('au_redirect')) {
function au_redirect(){
	if(auth() === true){
		header( 'Location: http://input.pdxsafety.org/' );
	}else{
		header( 'Location: http://input.pdxsafety.org/php/auth.php' );		
	}
	
}
}

if (!function_exists('updateProfile')) {
function updateProfile(){
	$user = array(
	'user' => $_POST['user'],
	'password' => hash('sha256',(addslashes($_POST['pass']))),
	'newPassword' => hash('sha256',(addslashes($_POST['newPass']))),
	'verifyNewPass' => hash('sha256',(addslashes($_POST['newPass2']))),
	'realname' => $_POST['realname'],
	'email' => $_POST['email'],
	);
	$updatedInfo;
	$con = mysql_connect(SQL_HOST, SQL_USER, SQL_PASS);
	$db_select = mysql_select_db(SQL_DBNAME);
	
	$cmd = "SELECT password FROM login WHERE username= '".$user['user']."'";
	$result = mysql_query($cmd);
	$row = mysql_fetch_row($result);
	if($row[0] !== $user['password']) {
		$updatedInfo = array('err' => true);
		echo json_encode($updatedInfo);
		return;
	}
	
	if($user['newPassword'] && $user['newPassword'] !== "" && $user['verifyNewPass'] && $user['verifyNewPass'] !== "" && $user['newPassword'] === $user['verifyNewPass']) {
		$queryUpdate = "UPDATE login SET password='".$user['newPassword']."' WHERE username='".$user['user']."'";
		$result = mysql_query($queryUpdate);
	}
	
	if($user['realname'] && $user['realname'] !== "") {
		$con = mysql_connect(SQL_HOST, SQL_USER, SQL_PASS);
		$db_select = mysql_select_db(SQL_DBNAME);
		$queryUpdate = "UPDATE login SET name='".$user['realname']."' WHERE username='".$user['user']."'";
		$result = mysql_query($queryUpdate);
	}
	
	if($user['email'] && $user['email'] !== "") {
		$queryUpdate = "UPDATE login SET email='".$user['email']."' WHERE username='".$user['user']."'";
		$result = mysql_query($queryUpdate);
	}
	
	$updatedInfo = array('success' => true);
	echo json_encode($updatedInfo);
}
}

//DOOO ITTT
	session_start();
	if ((!$_POST['login']) && (!$_POST['check']) && (!$_POST['update'])){
	    htmlformauth();
			
	} if ($_POST['login']){
		$log = login();
		au_redirect();
	}
	if((auth() === true)&&(!$_POST['check'])&&(!$_POST['update'])){
		au_redirect();
	}
	if ($_POST['check']){
		$pass = array('login' => "0");
		if (auth()){
			$pass = array("login" => "1", "user" => $_SESSION['user'], 'name' => $_SESSION['name']);
		}
		
		echo json_encode($pass);
		
	}
	if($_POST['update']) {
		echo updateProfile();
	}
	if($_POST["logout"]) {
	    session_destroy();
	    echo false;
	}

?>
