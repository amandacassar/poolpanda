<?php

    include("common.php");

    displayTitle("Pool Panda - T&C");
    
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
            <h1>Terms and Conditions</h1>
        </div>
    </div>

    <!-- inserting a vertical space -->
    <div class="mt-5"></div>


    <!-- list of T&C -->
    <div class="white-text">
        <ol>
            <li>
                Pool Panda offers online games and these are intended solely for entertainment purposes.  The use of these games for other purposes is strictly prohibited.
            </li>
            <br>
            <li>
                The games may be down due to required maintenance work or due to reasons beyond Pool Panda’s control.
            </li>
            <br>
            <li>
                Users are responsible for ensuring that their own software and hardware is suitable and up-to-date.
            </li>
            <br>
            <li>
                In order to use the online games, users must be registered for it.  Users must provide a username and an email address that will be registered to the user. 
            </li>
            <br>
            <li>
                Users must register for their accounts themselves.
            </li>
            <br>
            <li>
                Users have no right to claim registration or activation.
            </li>
            <br>
            <li>
                Users are prohibited from enacting any form of manipulative interference in online games.
            </li>
            <br>
            <li>
                Users are not allowed to create or use cheats, hacks, or any other third-party software products that may change the result of the online games.
            </li>
            <br>
            <li>
                Users are not allowed to use software that allows the mining of data.
            </li>
            <br>
            <li>
                Users are not allowed to sell, buy, or trade user accounts.
            </li>
        </ol>
    </div>
        
    <!-- inserting a vertical space -->
    <div class="mt-5"></div>


    <!-- button to go back to the register page -->
    <div class="row">
        <div class="col d-flex justify-content-left">
            <button type="button" class="btn btn-light btn-md">
                <a class="gray-text" href="register.php">Back</a>
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