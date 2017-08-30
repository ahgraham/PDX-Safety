<?php
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
//Gets the number of rows wanted with default 1
if (($_GET['postnum']===NULL) || ($_GET['postnum']==="")) {
$limit=20;
}
else {
$limit=$_GET['postnum'];
}
//End row get
//Gets district wanted, default all
$districts="(" . $_GET['districts'] . ")";
//End district get
//Gets type wanted default all
if (($_GET['type']===NULL) || ($_GET['type']==="")) {
$type="(0,1,2)";
}
else {
$type="(" . $_GET['type'] . ")";
}
//End type get
$json = array();
// Add  AND WHERE type in .. for sorting by type
$sql = "SELECT * FROM `Alerts` WHERE (";
if (($_GET['districts']!==NULL) && ($_GET['districts']!=="")) {
$sql .= "districtID in $districts AND ";
}
$sql .= "type in $type AND archive='0') ORDER BY `id` DESC LIMIT $limit";
// For debugging
//echo $sql;
// Fixes bug where json is null
mysqli_query($con, 'SET CHARACTER SET utf8');
$result = mysqli_query($con, $sql);
while($row = mysqli_fetch_array($result)) {
  $posts = array(
    'timestamp' => $row['timestamp'],
    'date' => date("m/d/y", $row['timestamp']),
    'id' => $row['id'],
    'districtName' => $row['districtName'],
    'districtId' => $row['districtID'],
    'title' => $row['title'],
    'subType' => $row['subType'],
    'content' => $row['content'],
    'authorName' => $row['authorName'],
    'type' => $row['type'],
    'authorinfo' => $row['authorinfo'],
    'caseNum' => $row['caseNum'],
    'priority' => $row['priority'],
  );
  array_push($json, $posts);
}

// Encodes as json
$jsonstring = json_encode($json);
$jsonstring = '{"posts" : ' . $jsonstring . '}'; 
echo $jsonstring;
// End json conversion
mysqli_close($con);
?>