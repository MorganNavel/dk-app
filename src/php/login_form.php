<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <script src="./js/login.js" ></script>
    <link rel="stylesheet" href="./css/style.css">
</head>
<body>  
    <form class="form" action="./php/login.php" method="post">

        <div class="flex">
            <div><object data="./img/email.svg" width="20" height="20"></object></div><input type="email" name="email" placeholder="Enter your email"><br> 
        </div>

        <div id="div-password" class="flex">
            <div><object data="./img/password.svg" width="20" height="20"></object></div><input type="password" name="password" id="password" placeholder="Enter password"> 
        </div>
        <div id="error-div"></div>
        <input type="submit" value="VALIDER" id="submit_btn">
    </form>
</body>