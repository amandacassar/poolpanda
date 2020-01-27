"use strict";

// declaring that the username attribute will be the key of the object
let key = "username";

// declaring object which will be used for checking user info - for Log In purposes & for assigning points
let currentUser = {};


// checking if username already exists 
function checkUsername()
{
    let uname = document.getElementById("username").value;
    let check = false;

    // clearing any previous messages
    document.getElementById("unameCheck").innerHTML = "";

    // looping through the local storage to check if username already exists
    for (let i = 0; i < localStorage.length; i++)
    {
        if (uname === localStorage.key(i))
        {
            check = true;
        }
    }   

    if (check === false)
    {
        document.getElementById("unameCheck").innerHTML = uname + " is available.";
    }
    else
    {
        document.getElementById("unameCheck").innerHTML = uname + " is not available.  Please enter another username.";
    } 
}


// checking that passwords match and that email is valid
// if all is correct, user details are stored in the local storage
function registerUser()
{
    let uname = document.getElementById("username").value;
    let upass = document.getElementById("pass").value;
    let upassConf = document.getElementById("pass-conf").value;
    let uemail = document.getElementById("email").value;
    let ucountryCode = document.getElementById("country").value;
    let upoints = 0;
    let checkBox = document.getElementById("check-tc");

    // booleans that will be used to confirm if a validation is true or false
    let nameCheck = true;
    let passCheck = false;
    let emailCheck = false;
    let tcCheck = false;

    // clearing any previous messages - not clearing the username check message on purpose
    document.getElementById("passCheck").innerHTML = "";
    document.getElementById("emailCheck").innerHTML = "";
    document.getElementById("tcCheck").innerHTML = "";

    // checking that username is not already in use
    for (let i = 0; i < localStorage.length; i++)
    {
        if (uname === localStorage.key(i))
        {
            nameCheck = false;
        }
    }   

    // if username is already in use, display error message (just in case user did not use the "Check availability" button)
    if (nameCheck === false)
    {
        document.getElementById("unameCheck").innerHTML = uname + " is not available.  Please enter another username.";
    }

    // checking that the password and the password confirmation are exactly the same
    if (upass != upassConf)
    {
        document.getElementById("passCheck").innerHTML = "Passwords do not match.  Enter again.";
    }
    else
    {
        passCheck = true;
    }

    // checking that the characteristics of an email address are included in the user's email
    let emailTest = new RegExp(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/);
    
    if (!emailTest.test(uemail))
    {
        document.getElementById("emailCheck").innerHTML = "Enter a valid email.";
    }
    else
    {
        emailCheck = true;
    }

    // checking if the checkbox for t&c has been ticked
    if (checkBox.checked != true)
    {
        document.getElementById("tcCheck").innerHTML = "Please agree with Terms and Conditions.";
    }
    else
    {
        tcCheck = true;
    }

    // if any of the validation for password, email and t&c is not correct, then return false
    if (nameCheck != true || passCheck != true || emailCheck != true || tcCheck != true)
    {
        return false;
    }
    // if all the validations for passowrd, email and t&c is true, i.e. correct, then display message of successful login, and store the user
    else    
    {
        document.getElementById("registrationCheck").innerHTML = uname + " you have successfully registered";
        
        // storing the user's input all in one object 
        let userObject = {username : uname, password : upass, email : uemail, countryCode : ucountryCode, points : 0};

        // storing the user object in the localStorage, and assigning username as key value
        localStorage.setItem(uname, JSON.stringify(userObject));

        // clear sessionStorage from any other logged in user
        sessionStorage.clear();

        // storing the user object in sessionStorage
        sessionStorage.setItem(uname, JSON.stringify(userObject));   

        // stringify and parse user object
        let stringUserObject = JSON.stringify(userObject);
        let parseUserObject = JSON.parse(stringUserObject);
       
        return true;
    }
}


// checking if username and password are correct, if yes, adding to sessionStorage
function loginUser()
{
    // getting user input in the log in form
    let uname = document.getElementById("logUsername").value;
    let upass = document.getElementById("logPass").value;

    // booleans that will be used to confirm if a validation is true or false
    let nameCheck = false;
    let passCheck = false;
    

    // checking that username exists and that the corresponding password was entered
    for (let i = 0; i < localStorage.length; i++)
    {
        if (uname === localStorage.key(i))
        {
            nameCheck = true;

            // getting the details of this user from the localStorage
            currentUser = JSON.parse(localStorage.getItem(localStorage.key(i)));

            if (upass === currentUser.password)
            {
                passCheck = true;
            }
        }
    }   

    // if username or password were not correct, display error message
    // else display success message and store user in sessionStorage
    if (nameCheck != true || passCheck != true)
    {
        document.getElementById("loginMessage").innerHTML = "Username or Password is incorrect.  Please try again.";
    }
    else
    {
        document.getElementById("loginMessage").innerHTML = uname + " you have successfully logged in";

        // clearing previously logged-in users - to have only the last one to log in as current player
        sessionStorage.clear();

        // storing the user object in the session storage
        sessionStorage.setItem(uname, JSON.stringify(currentUser));  
    }

    return false;
}


// setting the points of the current player
// this function will be called from the gameone.js file
// it will check if user obtained a better score, and if so, update user's points
function setPoints(uPoints)
{
    // if user object has values (i.e. player is logged in)
    if (sessionStorage.length > 0)
    {
        currentUser = JSON.parse(sessionStorage.getItem(sessionStorage.key(0)));

        // if user obtained a higher score than its current record, replace its points with the new score
        if (currentUser.points < uPoints)
        {
            currentUser.points = uPoints;

            // find this user's localStorage object and update its poins
            for (let i = 0; i < localStorage.length; i++)
            {
                if (currentUser.username === localStorage.key(i))
                {
                    localStorage.setItem(currentUser.username, JSON.stringify(currentUser));
                }
            }
        }
    }
}
