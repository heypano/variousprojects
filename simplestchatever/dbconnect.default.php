<?php 

$_SESSION["connection"]= new mysqli("localhost", "my_user", "my_password", "didiwin");

/* check connection */
if (mysqli_connect_errno()) {
    printf("Connect failed: %s\n", mysqli_connect_error());
    exit();
}


?>