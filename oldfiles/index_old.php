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
  echo "$row[0]";
  echo "<br />";
  }
//echo $tables[0];
for ($i=0; $i<count($tables); $i++) {
  $result = mysqli_query($con,"SELECT * FROM $tables[$i] ORDER BY `timestamp` DESC");
  while($row = mysqli_fetch_array($result)) {
    echo "<br />";
    echo "<b>" . $tables[$i] . "</b>";
    echo " " . $row['timestamp'];
    echo " " . $row['id'];
    echo " " . $row['districtName'];
    echo " " . $row['title'];
    echo " " . $row['content'];
    echo " " . $row['authorName'];
    echo " " . $row['type'];
    echo " " . $row['authorinfo'];
    echo " " . $row['priority'];
  }
}
//print json_encode($rows);
// End of for loop
mysqli_close($con);
?>