<?php
include_once 'dbconnect.php';

$mysqli = $_SESSION["connection"];

$name = $mysqli->real_escape_string($_POST['name']);
$message = $mysqli->real_escape_string($_POST['message']);
if (!$mysqli->query("INSERT into simplestchatever (name,message,date) VALUES ('$name','$message',NOW())")){
    printf("Error: %s\n", $mysqli->error);
}



?>