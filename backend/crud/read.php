<?php
require "connection.php";

$sql = "SELECT * FROM student_db";
$stmt = $con->prepare($sql);
$stmt->execute();
$student_db = $stmt->fetchAll();
?>

<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Students</title>
</head>
<body>

<h2>Students List</h2>
<a href="create.php">Add New Student</a>

<table border="1" cellpadding="8" cellspacing="0">
  <tr>
    <th>ID</th>
    <th>Name</th>
    <th>Email</th>
    <th>Age</th>
    <th>Operation</th>
  </tr>

  <?php foreach ($student_db as $item) { ?>
    <tr>
      <td><?php echo htmlspecialchars($item['id']) ?></td>
      <td><?php echo htmlspecialchars($item['name']) ?></td>
      <td><?php echo htmlspecialchars($item['email']) ?></td>
      <td><?php echo htmlspecialchars($item['age']) ?></td>
      <td>

        <!-- EDIT -->
        <a href="edit.php?id=<?php echo $item['id'] ?>">Edit</a>

        <!-- DELETE -->
        <form action="delete.php" method="post" style="display:inline;">
          <input type="hidden" name="id" value="<?php echo $item['id'] ?>">
          <button type="submit" onclick="return confirm('Delete this student?')">
            Delete
          </button>
        </form>

      </td>
    </tr>
  <?php } ?>

</table>

</body>
</html>
