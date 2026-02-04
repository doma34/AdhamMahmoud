<?php
$dbhost = "localhost";
$dbUser = "root";
$dbPass = "";
$dbName = "crud";
$conn = mysqli_connect($dbhost, $dbUser, $dbPass, $dbName);
if(!$conn){
  die("Something is wrong");
}
?>