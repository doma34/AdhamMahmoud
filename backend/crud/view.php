<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" integrity="sha384-QWTKZyjpPEjISv5WaRU9OFeRpok6YctnYmDr5pNlyT2bRjXh0JMhjY6hW+ALEwIH" crossorigin="anonymous">
  <link rel="stylesheet" href="style.css">
  <title>Book Details</title>
</head>

<body>
  <header class="d-flex justify-content-between my-4">
    <h1>Book Details</h1>
    <div>
      <a href="index.php" class="btn btn-primary">Add New Book</a>
    </div>
    <header>
      <div class="book-details my-4">
        <?php
        include("connect.php");

        if (!isset($_GET["id"]) || $_GET["id"] === "") {
          die("No ID");
        }

        $id = (int) $_GET["id"]; // يقفل باب الـ syntax error والحقن

        $sql = "SELECT * FROM books WHERE id = $id";
        $result = mysqli_query($conn, $sql);

        if (!$result) {
          die("SQL Error: " . mysqli_error($conn));
        }

        $row = mysqli_fetch_assoc($result);

        if (!$row) {
          die("Book not found");
        }
        ?>

        <h2>Title</h2>
        <p><?php echo htmlspecialchars($row["title"]); ?></p>

        <h2>Description</h2>
        <p><?php echo htmlspecialchars($row["description"]); ?></p>

        <h2>Type</h2>
        <p><?php echo htmlspecialchars($row["type"]); ?></p>

        <h2>Author</h2>
        <p><?php echo htmlspecialchars($row["author"]); ?></p>

      </div>
</body>

</html>