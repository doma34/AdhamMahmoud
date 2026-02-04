<?php
$host = "localhost";
$dbname = "workshop110";
$dbemail = "root";
$dbage = "";

try {
  $con = new PDO("mysql:host=$host;dbname=$dbname;charset=utf8mb4", $dbemail, $dbage, [
    PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
    PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
  ]);
} catch (PDOException $e) {
  die("DB Connection Failed: " . $e->getMessage());
}
