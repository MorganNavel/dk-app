<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="../css/style.css">
    <link rel="stylesheet" href="../css/header.css">
    <title>Login</title>
</head>

<body>
    <nav class="navbar">
        <div class="navbar__logo">
            <img src="../img/logo.png" height="32" alt="FR">
            <a href="">FRLearning</a>
        </div>
        <div class="navbar__menu">
            <li><a href="">Entraînement</a></li>
            <li><a href="">Participer</a></li>
            <li><a href="">Ma page</a></li>
            <li><a href="./login.php">Login</a></li>
            
        </div>
        <div class="navbar__language">
            <li><a href="">Langue</a></li>
            <li>
                <a href="">
                    <img src="../img/flag-france.png" width="30" alt="FR">
                </a>
            </li>
            <li>
                <a href="">
                    <img src="../img/flag-south-korea.png" width="30" alt="FR">
                </a>
            </li>
        </div>
    </nav>
    <form class="form" action="./authentification.php" method="post">
        
        <div class="flex">
            <div><object data="../img/email.svg" width="20" height="20"></object></div><input type="email" name="email" placeholder="Enter your email">
        </div>
        <br> 
        <div id="div-password" class="flex">
            <div><object data="../img/password.svg" width="20" height="20"></object></div><input type="password" name="password" id="password" placeholder="Enter password"> 
        </div>
        <div id="error-div"></div><br>
        <input type="submit" value="VALIDER" id="submit_btn"><br><br>
        <div class="flex"><a href="./signup.php">Pas encore inscrit ?</a></div>
    </form>
</body>
</html>