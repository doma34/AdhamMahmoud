<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" integrity="sha384-QWTKZyjpPEjISv5WaRU9OFeRpok6YctnYmDr5pNlyT2bRjXh0JMhjY6hW+ALEwIH" crossorigin="anonymous">

  <title>Create new book</title>
</head>
<body>
  <div class="container">
    <header class="d-flex justify-content-between my-4">
      <h1>Add New book</h1>
      <div>
        <a href="index.php" class="btn btn-primary">Back</a>
      </div>
    </header>
    <form action="process.php" method="post">
      <div class="form-element my-4">
        <input type="text" class="form-control" name="title" placeholder="Book title:">
      </div>

      <div class="form-element my-4">
        <input type="text" class="form-control" name="author" placeholder="author">
      </div>

      <div class="form-element my-4">
    <select name="type">
      <option value="">Select Book Type</option>
      <option value="Adventure">Adventure</option>
      <option value="Fantasy">Fantasy</option>
      <option value="Specially">Specially</option>
      <option value="Horror">Horror</option>
    </select>    
    </div>

      <div class="form-element my-4">
        <input type="text" class="form-control" name="description" placeholder="Book Description">
      </div>
      <div class="form-element">
        <input type="submit" class="btn btn-success" name="create" value="Add book">
      </div>
    </form>
  </div>
</body>
</html>