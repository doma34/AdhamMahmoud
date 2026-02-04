<?php
require "connection.php";
if($_SERVER["REQUEST_METHOD"] !== "POST"){
  header("Location: read.php");
  exit;
}

$id    = $_POST["id"] ?? null;
$name  = trim($_POST["name"] ?? "");
$email = trim($_POST["email"] ?? "");
$age   = $_POST["age"] ?? null;
$age   = ($age === "" || $age === null) ? null : (int)$age;

if (!$id || $name === "" || $email === "") {
  header("Location: read.php");
  exit;
}

try {
  $stmt = $con->prepare("
  UPDATE student_db
  SET name = name, email = email, age = :age
  WHERE id = :id");
  $stmt->execute([
    ":name"  => $name,
    ":email" => $email,
    ":age"   => $age,
    ":id"    => $id
  ]);
  header("Location: read.php");
} catch (PDOException $e) {
  echo "Error: " . $e->getMessage();
}
?>