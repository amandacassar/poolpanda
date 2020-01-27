<?php

    // displaying the page title 
    // linking the css files - styles and bootstrap
    // opening the body tag
    function displayTitle($page_title)
    {
        echo '<!DOCTYPE html>
        </html>
        <head>
            <title>' .$page_title. '</title>
        
            <link type="text/css" rel="stylesheet" href="bootstrap.css">
            <link type="text/css" rel="stylesheet" href="style.css">
        </head>
        
        <body>';
    }

    
    // displaying the logo at the top left corner
    function displayLogo()
    {
        echo '<header>
            <img src="assets/logo.png" class="img-fluid logo" alt="logo">
        </header>';
    }


    // displaying the navigation menu
    function displayNavMenu()
    {
        echo '<nav class="navbar navbar-expand-sm navbar-dark bg-dark menu-text">
        <button class="navbar-toggler" data-toggle="collapse" data-target="#navbarmenu">
            <span class="navbar-toggler-icon"></span>
        </button>
            <div class="collapse navbar-collapse w-100 order-3 dual-collapse2" id="navbarmenu">
                <ul class="navbar-nav ml-auto">
                    <li class="nav-item">
                        <a class="nav-link" href="index.php">Home</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="login.php">Log In</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="rankings.php">Rankings</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="contactus.php">Contact Us</a>
                    </li>
                </ul>
            </div>
        </nav>';
    }


    // displaying the footer
    function displayFooter()
    {
        echo '<footer class="footer my-footer">Copyright © 2019, Pool Panda.  All Rights Reserved.</footer>';
    }


    // linking the js files and closing the body and html tags
    function closeFile()
    {
        echo '<script type="text/javascript" src="jquery-3.4.1.js"></script>
            <script type="text/javascript" src="popper.js"></script>
            <script type="text/javascript" src="bootstrap.js"></script>
            <script type="text/javascript" src="usersInfo.js"></script>
        </body>
        </html>
        ';
    }

?>