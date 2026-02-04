<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" integrity="sha384-QWTKZyjpPEjISv5WaRU9OFeRpok6YctnYmDr5pNlyT2bRjXh0JMhjY6hW+ALEwIH" crossorigin="anonymous">

  <title>Edit book</title>
</head>
<body>
  <div class="container">
    <header class="d-flex justify-content-between my-4">
      <h1>Edit book</h1>
      <div>
        <a href="index.php" class="btn btn-primary">Back</a>
      </div>
    </header>
    <?php 
    if(isset($_GET["id"])){
      $id = $_GET["id"];
      include("connect.php");
      $sql = "SELECT * FROM books WHERE id=$id";
     $result = mysqli_query($conn, $sql);
     $row = mysqli_fetch_array($result);
     ?>
     <form action="process.php" method="post">
      <div class="form-element my-4">
        <input type="text" class="form-control" name="title" value="<?php echo $row["title"]; ?>" placeholder="Book title:">
      </div>

      <div class="form-element my-4">
        <input type="text" class="form-control" name="author" value="<?php echo $row["author"]; ?>" placeholder="author">
      </div>

      <div class="form-element my-4">
    <select name="type">
      <option value="">Select Book Type</option>
      <option value="Adventure" <?php if($row['type']=="Adventure"){echo "selected";} ?>>Adventure</option>
      <option value="Fantasy" <?php if($row['type']=="Fantasy"){echo "selected";} ?>>Fantasy </option>
      <option value="Specially" <?php if($row['type']=="Specially"){echo "selected";} ?>>Specially</option>
      <option value="Horror" <?php if($row['type']=="Horror "){echo "selected";} ?>>Horror</option>
    </select>    
    </div>

      <div class="form-element my-4">
        <input type="text" value="<?php echo $row["description"]; ?>" class="form-control" name="description" placeholder="Book Description">
      </div>
      <input type="hidden" name="id" value="<?php echo $row['id']; ?>">
      <div class="form-element">
        <input type="submit" class="btn btn-success" name="edit" value="Edit book">
      </div>
    </form>
<?php
    }
    ?>
    
  </div>
</body>
</html>