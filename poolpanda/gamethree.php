<?php
    include("common.php");
    displayTitle("Pool Panda - Triple Challenge");
?>

    <div class="gold-text" id="startMsg"></p>

    <img class="gameBackground" src="sprites/table.jpg" width="1200" height="650">
    <canvas class="gameCanvas" id="myCanvas" width="1200" height="650"></canvas>

    <!-- display timer -->
    <span id="timer2" class="timer-display">0</span>

    <!-- display the EXIT button-->
    <a class="exit-button" href="index.php">EXIT</a>
    
    <!-- images to be used for the game -->
    <img class="hide" id="whiteBall" src="sprites/wball.png">
    <img class="hide" id="redBall" src="sprites/ball.png">
    <img class="hide" id="blueBall" src="sprites/blueball.png">
    <img class="hide" id="yellBall" src="sprites/yellball.png">
    <img class="hide" id="line" src="sprites/line.png">


    <!-- do not require the other js files, so manually calling the game js file, and closing the body & html tags -->
    <script type="text/javascript" src="sweetalert.js"></script>
    <script type="text/javascript" src="usersInfo.js"></script>
    <script type="module" src="gamethree.js"></script>

</body>
</html>