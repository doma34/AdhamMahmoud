<?php
require_once "Auth.php";   

session_start();


$db = new PDO(
    "mysql:host=localhost;dbname=cardi;charset=utf8mb4",
    "root",
    ""
);

$db->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);


$auth = new Auth($db);


if (isset($_POST['username']) && isset($_POST['password'])) {
    $userid = $auth->authenticate($_POST['username'], $_POST['password']);

    if ($userid !== false) {
        $auth->log_user_in($userid);
        header("Location: index.php");
        exit;
    } else {
        $_SESSION["error"] = "Wrong username or password!";
        header("Location: index.php");
        exit;
    }
}


if (isset($_POST['logout'])) {
    $auth->log_user_out();
    header("Location: index.php");
    exit;
}


$userid = $auth->logged_in_user();


if ($userid === false) {
    require_once "login.php";
    exit;
}



if ($auth->get_user_role($userid) === 1) {
    echo "You are an administrator!<br>";
} else {
    echo "You are a regular user<br>";
}
?>

<form method="post" action="index.php">
    <input type="hidden" name="logout" value="1">
    <button>Logout</button>
</form>
