<?php

    include("common.php");

    displayTitle("Pool Panda - Contact Us");
    
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
            <h1>Contact Us</h1>
        </div>
    </div>

    <!-- inserting a vertical space -->
    <div class="mt-5"></div>


    <!-- displaying the form -->
    <form>
        <div class="form-group white-text">
            <label for="name">Name:</label>
            <input type="text" class="form-control" id="name" placeholder="your name">
        </div>
        <div class="form-group white-text">
            <label for="email">Email Address:</label>
            <input type="email" class="form-control" id="email" placeholder="your email address">
        </div>
        <div class="form-group white-text">
            <label for="message">Message:</label>
            <textarea class="form-control" id="message" placeholder="your message" rows="3"></textarea>
        </div>

        <!-- inserting a vertical space -->
        <div class="mt-5"></div>    


        <!-- check box to receive a copy of the message by email -->
        <div class="form-check col-md-12 justify-content-right white-text">
            <input type="checkbox" class="form-check-input" id="check-email">
            <label class="form-check-label" for="check-email">Send me a copy by email</label>
        </div>

        <!-- inserting a vertical space -->
        <div class="mt-4"></div>  


        <!-- submit button -->
        <button type="submit" class="btn btn-info mb-2">Submit</button>
    </form>

        
    <?php
        displayFooter();
    ?>
        
</div>


<?php
    closeFile();
?>
