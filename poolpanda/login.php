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
            <h1>Log In</h1>
        </div>
    </div>

    <!-- inserting a vertical space -->
    <div class="mt-5"></div>


    <!-- displaying the form -->
    <form>
        <div class="form-group white-text">
            <label for="username">Username:</label>
            <input type="text" class="form-control" id="logUsername" placeholder="your username">
        </div>
        <div class="form-group white-text">
            <label for="password">Password:</label>
            <input type="password" class="form-control" id="logPass" placeholder="your password">
        </div>

        <!-- inserting a vertical space -->
        <div class="mt-5"></div>

        <!-- Log In button + calling a function to validate user and login if valid -->
        <button onclick="return loginUser()" type="submit" class="btn btn-info">Log in</button>

        <!-- displaying a message of successfull or unsuccessfull login -->
        <p class="bold-text" id="loginMessage"></p>
    </form>

    <!-- inserting a vertical space -->
    <div class="mt-3"></div>


    <!-- link for when user forgot password -->
    <div class="row">
        <div class="col-12 d-flex justify-content-left">
            <a class="white-text" href="contactus.php">Forgot password ?</a>
        </div>
    </div>

    <!-- inserting a vertical space -->
    <div class="mt-5"></div>


    <div class="row gold-text">
        <div class="col-12 d-flex justify-content-left">
            <h4>New User?</h4>
        </div>
    </div>


    <!-- link to the register page -->
    <div class="row white-text">
        <div class="col-12 d-flex justify-content-left">
            <button type="button" class="btn btn-light btn-md how-to-button">
                <a class="gray-text" href="register.php">Register here</a>
            </button>
        </div>            
    </div>

    <!-- inserting a vertical space -->
    <div class="mt-5"></div>
    

    <!-- link to delete account -->
    <div class="row">
        <div class="col-12 d-flex justify-content-left">
            <a class="white-text" href="contactus.php">Delete my account</a>
        </div>
    </div>


    <?php
        displayFooter();
    ?>
        
</div>


<?php
    closeFile();
?>
