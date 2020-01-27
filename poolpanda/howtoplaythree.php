<?php

    include("common.php");

    displayTitle("Pool Panda - How To Play Three");
    
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
            <h1>How To Play Triple Challenge</h1>
        </div>
    </div>

    <!-- inserting a vertical space -->
    <div class="mt-5"></div>


    <!-- displaying the list of rules & instructions -->
    <div class="white-text container-background">
        <p>
            THIS IS A PRACTICE GAME.  No points are assigned for this game.
        </p>

        <p>
            The aim is to pocket three balls as quickly as possible.
        </p>
    
        <p>
            Use the keyboard's left and right arrows to set the direction of the shot.
        </p>

        <p>
            Use the space key to shoot the white ball.
        </p>
    
        <p>
            Challenge yourself by trying to beat your previous time.
        </p>

        <p>
            Practice this game to master the game of pool.
        </p>
    
    </div>

    <!-- inserting a vertical space -->
    <div class="mt-5"></div>


    <!-- button to go back to the home page -->
    <div class="row">
        <div class="col d-flex justify-content-left">
            <button type="button" class="btn btn-light btn-md">
                <a class="gray-text" href="index.php">Back</a>
            </button>
        </div>
    </div>
    

    <?php
    displayFooter();
    ?>
        
</div>


<?php
    closeFile();
?>