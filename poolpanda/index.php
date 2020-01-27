<?php

    include("common.php");

    displayTitle("Pool Panda - Home");
    
    // logo at the top
    displayLogo();

    // nav menu bar
    displayNavMenu();

?>

<!-- using the grid system for a responsive website -->
<div class="container">
    <div class="row">
        <div class="col-lg-12 white-text-center">
            <h1>Select Game:</h1>
        </div>
    </div>


    <!-- buttons to go to games pages -->
    <div class="row">
        <div class="col d-flex justify-content-center">
            <button type="button" class="btn btn-info btn-lg game-button">
                <a class="white-text" href="preGame.php">One Ball Shot</a>
            </button>
        </div>
        <div class="col d-flex justify-content-center">
            <button type="button" class="btn btn-info btn-lg game-button">
                <a class="white-text" href="gamethree.php">Triple Challenge</a>
            </button>
        </div>
    </div>


    <!--buttons to go to pages on how to play the games -->
    <div class="row">
        <div class="col d-flex justify-content-center">
            <button type="button" class="btn btn-light btn-md how-to-button">
                <a class="gray-text" href="howtoplayone.php">How To Play <br> One Ball Shot</a>
            </button>
        </div>
        <div class="col d-flex justify-content-center">
            <button type="button" class="btn btn-light btn-md how-to-button">
                    <a class="gray-text" href="howtoplaythree.php">How To Play <br> Triple Challenge </a>
            </button>
        </div>
    </div>


    <!-- Rankings Table (preview) -->
    <div class="row">
        <div class="col-12 d-flex justify-content-center">
            <table class="table my-table">
                <thead>
                    <tr>
                        <th scope="col">Ranking</th>
                        <th scope="col">Username</th>
                        <th scope="col">Score</th>
                        <th scope="col">Country</th>
                    </tr>
                </thead>
                <tbody>

                    <script>
                        // declaring the user objects that will be used to sort the localStorage
                        // users1 shall store the user with higher points
                        let user1 = {};
                        let user2 = {};

                        // declaring an array which will store user objects
                        let usersArray = [];

                        // populating the array with all the current user objects in localStorage
                        for (let i = 0; i <localStorage.length; i++)
                        {
                            usersArray.push(JSON.parse(localStorage.getItem(localStorage.key(i))))
                        }
                        
                        // using nested loop to do a bubble sort of localStorage
                        for (let i = 0; i < localStorage.length; i++)
                        {
                            for (let j = 0; j < (localStorage.length - 1); j++)
                            {
                                // bubble sort - matching pairs
                                // if the second object has more points than first object, swap positions
                                if (usersArray[j + 1].points > usersArray[j].points)
                                {
                                    user1 = usersArray[j + 1];
                                    user2 = usersArray[j];

                                    usersArray[j] = user1;
                                    usersArray[j + 1] = user2;
                                }
                            }
                        }

                        // declaring variables to be used to display data in the table
                        let table = "";
                        let uPosition = document.getElementById("position");
                        let uName = document.getElementById("uname");
                        let uPoints = document.getElementById("upoints");
                        let uCountry = document.getElementById("ucountry");

                        // looping through the array to get all the users' data
                        for (let r = 0; r < 3; r++)
                        {
                            // getting each user's details - position, username, points, country code
                            // each row will consist of the 4 details above
                            uPosition = r + 1;
                            uName = usersArray[r].username;        
                            uPoints = usersArray[r].points;        
                            uCountry = usersArray[r].countryCode;
                            
                            // setting the user's details, and including the respective html tag
                            // for position, the tag <th> is used to display it in bold
                            table += "<tr>";
                            table += "<th>" + uPosition + "</th>";
                            table += "<td>" + uName + "</td>";
                            table += "<td>" + uPoints + "</td>";
                            table += "<td>" + uCountry + "</td>";
                            table += "</tr>";
                        }

                        // displaying the table with its contents, as created in the for loop
                        document.write(table);
                    </script>   

                </tbody>
            </table>
        </div>
    </div>


    <!-- link to rankings page, beneath the rankings table preview -->
    <div class="row">
        <div class="col-12 d-flex justify-content-center">
            <a class="white-text" href="rankings.php">View Full Rankings List here >>></a>
        </div>
    </div>
    
    
    <?php
        displayFooter();
    ?>
        
</div>


<?php
    closeFile();
?>