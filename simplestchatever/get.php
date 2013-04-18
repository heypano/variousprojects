<?php
include_once('dbconnect.php');
$mysqli = $_SESSION["connection"];
$result = $mysqli->query("SELECT * FROM simplestchatever ORDER BY date ASC");
$array = array();
while($row = $result->fetch_array()){
  $array[]=$row;
}
echo json_encode($array);
?>