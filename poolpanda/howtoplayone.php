<?php

    include("common.php");

    displayTitle("Pool Panda - How To Play One");
    
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
            <h1>How To Play One Ball Shot</h1>
        </div>
    </div>

    <!-- inserting a vertical space -->
    <div class="mt-5"></div>


    <!-- list of game rules & instructions -->
    <div class="white-text container-background">
        <p>
            The aim is to pocket one ball as quickly as possible.
        </p>
    
        <p>
            Use the keyboard's left and right arrows to set the direction of the shot.
        </p>

        <p>
            Use the space key to shoot the white ball.
        </p>
    
        <p>
            After each shot, the white ball returns back to its original position
        </p>
    
        <p>
            You will have thirty seconds time to pocket each ball.
        </p>

        <p>
            The time left when the ball is pocketed will be equivalent to the number of points that you will get for that pocket.
        </p>
        <p>
            There will be five scenarios in the one ball shot game.  
            <br>
            •   The first scenario will have the coloured ball placed in line with the white ball.  
            <br>
            •   The next four scenarios will have the coloured ball positioned randomly across the table. 
            <br> 
            You will gain points for each completed scenario, as described in the point before this one. 
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
