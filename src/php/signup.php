<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>FKLearning</title>
    <script src="./js/form.js" ></script>
    <link rel="stylesheet" href="./css/style.css">
</head>
<body>  
    <form class="form" action="./php/authentification.php" method="post">

        <div class="flex">
            <!--<div><object data="./img/name.svg" width="20" height="20"></object></div>--><input type="text" name="name" placeholder="Enter your name"><br>
        </div>

        <div class="flex">
            <!--<div><object data="./img/email.svg" width="20" height="20"></object></div>--><input type="email" name="email" placeholder="Enter your email"><br> 
        </div>

        <div id="div-password" class="flex">
            <!--<div><object data="./img/password.svg" width="20" height="20"></object></div>--><input type="password" name="password" id="password" placeholder="Enter password"><br>
            <!--<div><object data="./img/confirm_password.svg" width="20" height="20"></object></div>--><input type="password" name="confirm_password" id="confirm-password" placeholder="Confirm password">
        </div>
        <div id="error-div"></div>
        <br>
        <input type="submit" value="VALIDER" id="submit_btn">
    </form>
</body>
</html>