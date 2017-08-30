<?php
//MySQL information
$mysql_host='mysql6.000webhost.com';
$mysql_user='a2679400_poliapp';
$mysql_passwd='poliapp503';
$mysql_dbname='a2679400_test';
$con=mysqli_connect($mysql_host,$mysql_user,$mysql_passwd,$mysql_dbname);
// Check connection
if (mysqli_connect_errno())
  {
  echo "Failed to connect to MySQL: " . mysqli_connect_error();
  }

$result = mysqli_query($con,"SHOW TABLES like 'district_%'");
$tables = array();
// Get all districts
while($row = mysqli_fetch_array($result))
  {
  $tables[] = $row[0];
  /* for debugging
  echo "$row[0]";
  echo "<br />";
  */
  }
$json = array();
for ($i=0; $i<count($tables); $i++) {
  $result = mysqli_query($con,"SELECT * FROM $tables[$i] ORDER BY `timestamp` DESC");
  while($row = mysqli_fetch_array($result)) {
    $posts = array(
      'timestamp' => $row['timestamp'],
      'date' => date("m/d/y", $row['timestamp']),
      'id' => $row['id'],
      'districtName' => $row['districtName'],
      'districtId' => substr($tables[$i], 9),
      'title' => $row['title'],
      'content' => $row['content'],
      'authorName' => $row['authorName'],
      'type' => $row['type'],
      'authorinfo' => $row['authorinfo'],
      'priority' => $row['priority'],
    );
    array_push($json, $posts);
  }
}
// Give posts keys
$sorted_keys = array();
// This loop gives each timestamp and gives it a key
for ($i=0; $i<count($json); $i++) {
  $sorted_keys[$i] = $json[$i]["timestamp"];
}
// End key creation
// This sorts the timestamps, returning their place in the array
arsort($sorted_keys);
// End sort
// This sorts the database according to the keys
$sorted_json = array();
foreach($sorted_keys as $key => $value) {
  array_push($sorted_json, $json[$key]);
}
// End database sort
// Encodes sorted database as json
$jsonstring = json_encode($sorted_json);
$jsonstring = '{"posts" : ' . $jsonstring . '}'; 
echo $jsonstring;
// End json conversion
mysqli_close($con);
?>