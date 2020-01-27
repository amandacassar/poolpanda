<?php

    include("common.php");
    include("countries.php");

    displayTitle("Pool Panda - Register");
    
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
            <h1>Register</h1>
        </div>
    </div>

    <!-- inserting a vertical space -->
    <div class="mt-5"></div>


    <!-- displaying the form -->
    <p>
        <div class="form-group white-text">
            <label for="username">Enter Username:</label>
            <input type="text" class="form-control" id="username" placeholder="enter username here" required>

            <div class="mt-3"></div>

            <button onclick="return checkUsername()" type="submit" class="btn btn-secondary mb-2"> Check availability </button>

            <!-- checking if username is already in use or not -->
            <p class="gold-text" id="unameCheck"></p>
        </div>


        <div class="form-group white-text">
            <label for="pass">Enter Password:</label>
            <input type="password" class="form-control" id="pass" placeholder="enter password here" required>
        </div>

        <div class="form-group white-text">
            <label for="pass">Confirm Password:</label>
            <input type="password" class="form-control" id="pass-conf" placeholder="confirm your password here" required>
            
            <!-- message to display if passwords do not match -->
            <p class="gold-text" id="passCheck"></p>
        </div>


        <div class="form-group white-text">
            <label for="email">Enter Email Address:</label>
            <input type="email" class="form-control" id="email" placeholder="enter email address here" required>

            <!-- message to display after checking if email is already in use or not -->
            <p class="gold-text" id="emailCheck"></p>
        </div>


        <!-- Select Country drop-down menu -->
        <p class="white-text"> Select Country: </p>
        <select id="country" class="btn-group" method="POST">
            <button type="button" class="btn btn-secondary dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                Select Country
            </button>

            <!-- using php to get the values & list items for the dropdown menu - these have been stored in an associative array in the file countries.php -->
            <!-- using the tag "button" from bootstrap for mouse cursor display -->
            <div class="dropdown-menu back-color">
                <?php foreach($countriesList as $key => $countries)
                { ?>
                    <button class="dropdown-item"> 
                        <option value="<?php echo $key ?>">
                            <?php echo $countries ?>
                        </option>
                    </button>
                <?php 
                } ?>
            </div>
        </select>
        
        
        <!-- inserting a vertical space -->
        <div class="mt-5"></div>    


        <!-- check box to agree with T&C, including a link to T&C-->
        <div class="form-check col-md-12 justify-content-right">
            <input type="checkbox" class="form-check-input" id="check-tc">
            <label class="form-check-label" for="check-tc"><a class="gold-text" href="tc.php">Agree with Terms and Conditions</a></label>
            <p class="gold-text" id="tcCheck"></p>
        </div>

        <!-- inserting a vertical space -->
        <div class="mt-4"></div>  

        <!-- storing user info -->
        <button onclick="return registerUser()" type="submit" class="btn btn-info mb-2">Register</button>

        <!-- message to display once registration is successfull -->
        <p class="bold-text" id="registrationCheck"></p>
    </p>

    <?php
        displayFooter();
    ?>
</div>  
                    
<?php
    closeFile();
?>