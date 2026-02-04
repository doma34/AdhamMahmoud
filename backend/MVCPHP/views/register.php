<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.8/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-sRIl4kxILFvY47J16cr9ZwB07vP4J8+LH7qKQnuqkuIAvNWLzeN8tE5YBujZqJLB" crossorigin="anonymous">

  <title>Document</title>
</head>
<body>
    <div id="login">
    <h3 class="text-center text-white pt-5">Register Form</h3>
    <div class="container">
      <div id="login-row" class="row justify-content-center align-items-center">
        <div id="login-column" class="col-md-6">
          <div id="login-form" class="col-md-12">
            <form id="login-form" class="form" action="" method="post">
              <h3 class="txt-center text-info">Register</h3>
              <div class="from-group">
                <label for="username" class="txt-info">Username:</label><br>
                <input type="text" name="username" id="username" class="form-control">
              </div>

                  <div class="from-group">
                <label for="passowrd" class="txt-info">Password:</label><br>
                <input type="text" name="password" id="password" class="form-control">
              </div>
              <div class="form-group">
                <input type="submit" name="RegisterSubmit" class="btn btn-info 
                btn-md" value="submit"/>
              </div>
              <div id="reg_link" class="text-right">
                <a href="?login=true" class="text-info">login</a>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</body>
</html>