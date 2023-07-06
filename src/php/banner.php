<header>
<script src="./js/banner.js"></script>
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css"/>
<link rel="stylesheet" href="./css/banner.css">
</header>
<body>
    <div class="div_banner">
        <div class="slidebox">
            <input type="radio" name="slide" id="slide01" checked>
            <input type="radio" name="slide" id="slide02">
            <input type="radio" name="slide" id="slide03">
            <input type="radio" name="slide" id="slide04">
            <ul class="slidelist">
                <li class="slideitem">
                    <label for="slide04" class="left">
                        <i class="fa-solid fa-arrow-left"></i>
                    </label>
                    <h1>
                        사랑해 1
                    </h1>
                    <label for="slide02" class="right">
                        <i class="fa-solid fa-arrow-right"></i>
                    </label>
                    <h2>
                        Je t'aime
                    </h2>
                </li>
                <li class="slideitem">
                    <label for="slide01" class="left">
                        <i class="fa-solid fa-arrow-left"></i>
                    </label>
                    <h1>
                    사랑해 2
                    </h1>
                    <label for="slide03" class="right">
                        <i class="fa-solid fa-arrow-right"></i>
                    </label>
                    <h2>
                        Je t'aime
                    </h2>
                </li>
                <li class="slideitem">
                    <label for="slide02" class="left">
                        <i class="fa-solid fa-arrow-left"></i>
                    </label>
                    <h1>
                    사랑해 3
                    </h1>
                    <label for="slide04" class="right">
                        <i class="fa-solid fa-arrow-right"></i>
                    </label>
                    <h2>
                        Je t'aime
                    </h2>
                </li>
                <li class="slideitem">
                    <label for="slide03" class="left">
                        <i class="fa-solid fa-arrow-left"></i>
                    </label>
                    <h1>
                        사랑해 4
                    </h1>
                    <label for="slide01" class="right">
                        <i class="fa-solid fa-arrow-right"></i>
                    </label>
                    <h2>
                        Je t'aime
                    </h2>
                </li>
            </ul>
            <div class="div_dots">
                <span class="dot" onclick="currentSlide(1)">●</span> 
                <span class="dot" onclick="currentSlide(2)">●</span> 
                <span class="dot" onclick="currentSlide(3)">●</span> 
                <span class="dot" onclick="currentSlide(4)">●</span> 
            </div>
        </div>
    </div>
</body>