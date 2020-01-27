<?php

    include("common.php");

    displayTitle("Pool Panda - Log In");
    
    // logo at the top
    displayLogo();

    // nav menu bar
    displayNavMenu();

?>


<!-- inserting a vertical space -->
<div class="mt-5"></div>


<!-- using the grid system for a responsive website -->
<div class="container width-40">
    <div class="row">
        <div class="col-md-12 justify-content-left white-text">
            <h1 class="gold-text" id="playerUsername">
            
            <script>
                 if (sessionStorage.length > 0)
                {
                    let player = JSON.parse(sessionStorage.getItem(sessionStorage.key(0)));
                    document.getElementById("playerUsername").innerHTML = player.username;
                }
                else
                {
                    document.getElementById("playerUsername").innerHTML = "Guest Player";
                }
            </script>
            
            </h1>
        </div>
    </div>

    <!-- inserting a vertical space -->
    <div class="mt-5"></div>

    
    <h2 class="white-text"> Are you ready to play? </h2>

    <!-- inserting a vertical space -->
    <div class="mt-5"></div>


    <!-- link for when user is ready to play -->
    <div class="row white-text">
        <div class="col-12 d-flex justify-content-left">
            <button type="button" class="btn btn-primary btn-md how-to-button">
                <a class="white-text bold-text" href="gameone.php"> Play </a>
            </button>
        </div>            
    </div>

    <!-- inserting a vertical space -->
    <div class="mt-5"></div>

    <p class="white-text"> Or go back to home page </p>

    <!-- inserting a vertical space -->
    <div class="mt-3"></div>

    <!-- link for when user wants to go back and not play now -->
    <div class="row white-text">
        <div class="col-12 d-flex justify-content-left">
            <button type="button" class="btn btn-dark btn-md how-to-button">
                <a class="white-text bold-text" href="index.php"> Back </a>
            </button>
        </div>            
    </div>

    <!-- inserting a vertical space -->
    <div class="mt-5"></div>


    <?php
        displayFooter();
    ?>
        
</div>


<?php
    closeFile();
?>
