"use strict";

// class for the white ball
class WhiteBall
{
    // getting parameters - context, game width, game height (i.e. playing area)
    constructor()
    {
        // getting the image of the white ball
        this.image = document.getElementById("whiteBall");

        // size of the ball - width and height
        this.size = 50;

        // starting position of the ball
        this.position = {
            x : tableWidth / 3, 
            y : (tableHeight / 2) - (this.size / 2)
        };

        // starting speed of the ball
        this.maxSpeed = {x : 500, y : 500};

        this.speed = {x : 0, y : 0};

        // variable used to determine when the ball is moving
        this.moving = false;

        // variable used to decrease the speed
        this.decreaseSpeed = 0;                

        // angle between the centres of the two balls, at the time of collision
        this.collisionAngle = 0;

        // will be used to calculate the angle of movement of the white ball
        this.lastPosition = {x : 0, y : 0};

        // getting the context
        this.ctx = ctx;
    }

    // draw the ball on the canvas
    // parameters - image, x-axis, y-axis, width, height
    draw()
    {
        this.ctx.drawImage(this.image, this.position.x, this.position.y, this.size, this.size);
    }

    // when space bar is pressed - shoot the ball
    shootBall()
    {
        // if the ball is moving already, do not go through the code of this function
        if (this.moving === true) return;

        if (line.rotation === 0)
        {
            this.speed.x = this.maxSpeed.x;
            this.speed.y = 0;
        }
        else
        {
            // setting the speed values to the maxSpeed value multiplied by the cosine or sine of the line.rotation radians
            // using cosine of line.rotation radians, for the x-axis (adjacent of "triangle" - according to the angle of rotation)
            // using sine of line.rotation radians, for the y-axis (opposite)
            this.speed.x = this.maxSpeed.x * Math.cos(line.rotation);
            this.speed.y = this.maxSpeed.y * Math.sin(line.rotation);
        }

        this.moving = true;
    }

    // update the position of the ball
    // parameter - time elapsed
    update(deltaTime)
    {
        // to go back and display ball - for the very first time that this method is called
        if (!deltaTime) return;

        // if moving is true (set thru the shootBall function) AND the decreaseSpeed has not reached a value of 300 - i.e. the ball is not moving very slowly..
        if ((this.moving === true) && (this.decreaseSpeed < 300))
        {
            // increasing the value of the decreasing speed, to slow down the ball with every iteration
            this.decreaseSpeed += 1;

            // update the position of the ball, by updating the x- and y- position
            // the incrementing decreaseSpeed is added to deltaTime, to always decrease the speed of the ball with each iteration 
            this.position.x += this.speed.x / (deltaTime + this.decreaseSpeed);
            this.position.y += this.speed.y / (deltaTime + this.decreaseSpeed);

            // if the ball reaches the left or right end
            if (this.position.x < playAreaStartX || this.position.x > playAreaEndX)
            {
                // if ball has hit one of the holes in the corners, reset the white ball at starting position (allowing 10 discrepancy from the exact hole point)
                if ((this.position.y < (playAreaStartY + 10)) || (this.position.y > (playAreaEndY - 10)))
                {
                    // play the pocket sound
                    pocketSound.play();

                    reset();
                }

                // if ball did not hit one of the holes, reverse the direction of the x-axis
                else
                {
                    // checking if ball when out of play area and updating its x-coordinate to not make it look out of play area
                    if (this.position.x < playAreaStartX)
                    {
                        this.position.x = playAreaStartX;
                    } 
                    else if (this.position.x > playAreaEndX)
                    {
                        this.position.x = playAreaEndX;
                    }

                    this.speed.x = -this.speed.x;
                }
                
                // play the collision sound
                collisionSound.play();
            }
            
            // if the ball reaches the top or bottom end
            if (this.position.y < playAreaStartY || this.position.y > playAreaEndY)
            {
                // if ball has hit one of the holes in the corners, reset the white ball at starting position (allowing a discrepancy from the exact hole point)
                if ((this.position.x > (middleHoleStart - 5)) && (this.position.x < (middleHoleEnd + 25)))
                {
                    // play the pocket sound
                    pocketSound.play();

                    reset();
                }

                // if ball did not hit one of the holes, reverse the direction of the y-axis
                else
                {
                    // checking if ball when out of play area and updating its y-coordinate to not make it look out of play area
                    if (this.position.y < playAreaStartY)
                    {
                        this.position.y = playAreaStartY;
                    } 
                    else if (this.position.y > playAreaEndY)
                    {
                        this.position.y = playAreaEndY;
                    }

                    this.speed.y = -this.speed.y;
                }
                
                // play the collision sound
                collisionSound.play();
            }

            // using new variables to check if balls collided

            // ballCentre will be the x- and y- axis coordinates of the centre of the coloured ball
            let ballCentre = {
                x : ball.position.x + (ball.size / 2),
                y : ball.position.y + (ball.size / 2)
            }

            // wBallCentre will be the x- and y- axis coordinates of the centre of the white  ball
            let wBallCentre = {
                x : this.position.x + (this.size / 2),
                y : this.position.y + (this.size / 2)
            }

            let adjacent = ballCentre.x - wBallCentre.x;     // adjacent will represent the difference between the current x-coordinates of the two balls
            let opposite = ballCentre.y - wBallCentre.y;     // opposite will represent the difference between the current y-coordinates of the two balls

            // calculating the angle at which the two balls collided
            // i.e. the angle relative to the horizontal line, between the centres of the two balls
            this.collisionAngle = Math.atan2(opposite, adjacent);

            // this.size will represent the addition of the radius of the two balls
            // if the positive difference between the x- and y- coordinates is less than the addition of the two radius, it means that the balls collided
            if ((Math.abs(adjacent) <= this.size) && (Math.abs(opposite) <= this.size))
            {
                // if white ball collided at a perpendicular angle with the coloured ball, reverse teh direction of movement
                if (this.collisionAngle === 0)
                {
                    this.speed.x = -this.speed.x;
                    this.speed.y = -this.speed.y;               
                }
                else
                {
                    this.speed.x = this.speed.x * Math.cos(this.collisionAngle);
                    this.speed.y = this.speed.y * Math.sin(this.collisionAngle);
                }

                // passing the parameters to move the coloured ball accordingly
                ball.collision(this.collisionAngle, this.decreaseSpeed);

                // play the collision sound
                collisionSound.play();
            }

            // recording the last position for the white ball, to be able to calculate the angle of direction when balls collide
            this.lastPosition = {
                x : this.position.x,
                y : this.position.y
            }
        }

        // if the white ball stops moving, re-draw the white line for the next shot
        // (which should be same time as when the coloured ball stops moving since they share the same decreaseSpeed value)
        if (this.decreaseSpeed >= 300)
        {
            nextShot();
        }
    }
}


// class for the coloured ball
class ColourBall
{
    // getting parameters - context, game width, game height (i.e. playing area)
    constructor()  // need to add white ball speed as parameters ????????
    {
        // getting the image of the coloured ball
        this.image = document.getElementById("colourBall");

        // size of the ball - width and height
        this.size = 50;

        // starting position of the ball
        this.position = {
            x : tableWidth * 2 / 3, 
            y : (tableHeight / 2) - (this.size / 2)
        };

        // maximum speed possible for thi ball - if white ball is shot when right next to it
        this.maxSpeed = {x : 500, y : 500};

        this.speed = {x : 0, y : 0};

        // variable used to determine when the ball is moving
        this.moving = false;

        // variable used to decrease the speed
        this.decreaseSpeed = 0;
        
        // getting the context
        this.ctx = ctx;
    }

    // draw the ball on the canvas
    // parameters - image, x-axis, y-axis, width, height
    draw()
    {
        this.ctx.drawImage(this.image, this.position.x, this.position.y, this.size, this.size);
    }

    // get parameters from white ball 'update' function
    // parameters - angle between the centre of the two balls at time of collision (angle) + decreaseSpeed value (this will be the initial speed of the coloured ball)
    collision(angle, inducedSpeed)
    {
        this.decreaseSpeed = inducedSpeed;

        // the speed of the coloured ball is deteremined by the angle between the two balls (angle)
        // cos of the angle - to calculate the x-axis direction
        // sin of the angle - to calculate the y-axis direction
        this.speed.x = this.maxSpeed.x * Math.cos(angle);
        this.speed.y = this.maxSpeed.y * Math.sin(angle);
    }

    // update the position of the ball
    // parameters - time elapsed, position of white ball, decreaseSpeed value
    update(deltaTime)
    {
        // to go back and display ball - for the very first time that this method is called
        if (!deltaTime) return;

        // if the ball is moving, and decreaseSpeed has not reached a value of 300 - i.e. the ball is not moving very slowly..
        if ((this.decreaseSpeed !== 0) && (this.decreaseSpeed < 300))
        {
            // increasing the value of this.decreaseSpeed
            this.decreaseSpeed += 1;

            // update the position of the ball, by updating the x- and y- position
            // the incrementing decreaseSpeed is added to deltaTime, to always decrease the speed of the ball with each iteration 
            this.position.x += this.speed.x / (deltaTime + this.decreaseSpeed);
            this.position.y += this.speed.y / (deltaTime + this.decreaseSpeed);

            // if the ball reaches the left or right end
            if (this.position.x < playAreaStartX || this.position.x > playAreaEndX)
            {
                // if ball has hit one of the holes in the corners, go to the next level (allowing 10 discrepancy from the exact hole point)
                if ((this.position.y < (playAreaStartY + 10)) || (this.position.y > (playAreaEndY - 10)))
                {
                    // adding points to the current player
                    userPoints += counter;

                    // play the pocket sound
                    pocketSound.play();

                    // moving to the next level
                    nextLevel();
                }

                // if ball did not hit one of the holes, reverse the direction of the x-axis
                else
                {
                    // checking if ball when out of play area and updating its x-coordinate to not make it look out of play area
                    if (this.position.x < playAreaStartX)
                    {
                        this.position.x = playAreaStartX;
                    } 
                    else if (this.position.x > playAreaEndX)
                    {
                        this.position.x = playAreaEndX;
                    }

                    this.speed.x = -this.speed.x;
                }
                
                // play the collision sound
                collisionSound.play();
            }
            
            // if the ball reaches the top or bottom end
            if (this.position.y < playAreaStartY || this.position.y > playAreaEndY)
            {
                // if ball has hit one of the holes in the corners, go to the next level (allowing a discrepancy from the exact hole point)
                if ((this.position.x > (middleHoleStart - 5)) && (this.position.x < (middleHoleEnd + 25)))
                {
                    // adding points to the current player
                    userPoints += counter;

                    // play the pocket sound
                    pocketSound.play();

                    // moving to the next level
                    nextLevel();
                }

                // if ball did not hit one of the holes, reverse the direction of the y-axis
                else
                {
                    // checking if ball when out of play area and updating its y-coordinate to not make it look out of play area
                    if (this.position.y < playAreaStartY)
                    {
                        this.position.y = playAreaStartY;
                    } 
                    else if (this.position.y > playAreaEndY)
                    {
                        this.position.y = playAreaEndY;
                    }

                    this.speed.y = -this.speed.y;
                }
                
                // play the collision sound
                collisionSound.play();
            }
        }
    }
}


// class for the direction line
class Line
{
    constructor()  
    {
        // getting the image of the line
        this.image = document.getElementById("line");

        // size of the line - width and height
        this.size = {x : 1000, y : 1};

        // starting position of the ball
        this.position = {
            x : (tableWidth / 3) + 25,      // 25 being the radius of the white ball 
            y : tableHeight / 2
        };

        // rotation angle
        this.rotation = 0;

        // getting the context
        this.ctx = ctx;
    }

    // draws the line on the canvas
    // parameters - image, x-axis, y-axis, width, height
    draw()
    {
        this.ctx.save();                                                // saving the current canvas context
        this.ctx.translate(this.position.x, this.position.y);           // translating the starting position of the image to the starting position of the line
        this.ctx.rotate(this.rotation);                                 // rotating the image by 1 degree (clockwise or anticlockwise) with every key press
        this.ctx.drawImage(this.image, 0, 0, this.size.x, this.size.y); // drawing the image - x=0 and y=0 since the ctx.translate command deteremines the starting position
        this.ctx.restore();                                             // restoring the previous canvas context
    }

    // rotates the line anti-clockwise by 1 radian with each key press
    rotateAntiClockwise()
    {
        this.rotation -= Math.PI / 180;
    }

    // rotates the line clockwise by 1 radian with each key press
    rotateClockwise()
    {
        this.rotation += Math.PI / 180;
    }

    // clear the line from the canvas
    clear()
    {
        // shifting the line to a point outside of the page so that it does not show anymore
        this.position.x = -5000;
        this.position.y = -5000;
    }

    update(deltaTime)
    {
        // to go back and display ball - for the very first time that this method is called
        if (!deltaTime) return;
    }
}



//  MAIN PROGRAM

let myCanvas = document.getElementById("myCanvas");
let ctx = myCanvas.getContext("2d");

// declaring the widht and height of the table
let tableWidth = 1200;
let tableHeight = 650;

// variable containing the far ends of the x- and y- axis of the playing area
// these figures are taking in consideration the width and height of the balls - 50px
let playAreaStartX = 80;
let playAreaEndX = 1085;
let playAreaStartY = 75;
let playAreaEndY = 530;

// variable to calculate the time elapsed
let lastTime = 0;

// initiating an instance of the line
let line = new Line(ctx, tableWidth, tableHeight);

// initiating an instance of the white ball
let wBall = new WhiteBall(ctx, tableWidth, tableHeight);

// initiating an instance of the coloured ball
let ball = new ColourBall(ctx, tableWidth, tableHeight);   

// creating an object that will include all the objects for the game
let gameObjects = [wBall, ball, line];

// sound of ball collision
let collisionSound = new Audio("assets/collision.mp3");

// sound of ball being pocketed
let pocketSound = new Audio("assets/pocket.mp3");

// sound for game over
let gameOverSound = new Audio("assets/gameover.mp3");

// sound for when user completes all 5 levels
let applauseSound = new Audio("assets/applause.mp3");

// the x-axis of the start of the middle holes, and the x-axis of their end
let middleHoleStart = 560;
let middleHoleEnd = 585;

// game level counter - value increases by 1 whenever the coloured ball is holed
let levelCounter = 1;
let level = document.getElementById("level");

// timer displayed at the top-right of the page
let counter = 30;
let timer = document.getElementById("timer");

// userPoints will be storing the current player's points
let userPoints = 0;


// function to handle user input
function inputHandler()
{
    window.onkeydown = event => {
        switch (event.keyCode)
        {
            // if user pressed the left arrow key
            case 37:
                line.rotateAntiClockwise();
                break;

            // if user presses the right arrow key
            case 39:
                line.rotateClockwise();
                break;

            // if user presses the space bar
            case 32:
                wBall.shootBall();
                line.clear();
                break;
        }
    }
}


// the game loop
// timestamp is obtained through the requestAnimationFrame
function mainLoop(timestamp)
{
    let deltaTime = timestamp - lastTime;
    lastTime = timestamp;

    ctx.clearRect(0, 0, tableWidth, tableHeight);
    
    // loop that calls the update method of each object in the game (white ball, coloured ball, line)
    gameObjects.forEach((object) => object.update(deltaTime));

    // loop that calls the draw method of each object in the game (white ball, coloured ball, line)
    gameObjects.forEach((object) => object.draw());

    // if the white ball is not moving, call the inputHandler function to handle user input when space bar or left/right arrow keys are pressed
    if (wBall.moving === false)
    {
        inputHandler();
    }

    window.requestAnimationFrame(mainLoop);
}

window.onload = mainLoop();


// to reset the direction line at the centre of the white ball
// this function is called when the balls stop moving
function nextShot()
{
    wBall.moving = false;

    // re-drawing the direction line, starting from the center of the white ball
    line.position = {
        x : wBall.position.x + (wBall.size / 2),    // wBall.size / 2 = the radius of the white ball
        y : wBall.position.y + (wBall.size / 2)
    }

    // re-setting the rotation of the direction line, and the decreasing speed value of the white ball
    line.rotation = 0;
    wBall.decreaseSpeed = 0;
}


// to reset the white ball at starting position - if white ball goes in the hole
function reset()
{
    wBall.moving = false;

    // placing the white ball in its original position
    wBall.position = {
        x : tableWidth / 3, 
        y : (tableHeight / 2) - (wBall.size / 2)
    }

    // placing the direction line back in its original position
    line.position = {
        x : wBall.position.x + 25,      // 25 being the radius of the white ball 
        y : wBall.position.y + 25
    }

    // re-setting the rotation of the direction line, and the decreasing speed value of the white ball
    line.rotation = 0;
    wBall.decreaseSpeed = 0;
}


// when coloured ball is pocketed, move to the next level
function nextLevel()
{
    wBall.moving = false;

    // getting a random x- and y- coordinates for the coloured ball
    // adding the playArea values and the ball size, to make sure it does not generate coordinates outside of the playing area

    let randomX = Math.floor(Math.random() * (playAreaEndX - (ball.size * 2))) + playAreaStartX;
    let randomY = Math.floor(Math.random() * (playAreaEndY - (ball.size * 2))) + playAreaStartY;

    // placing the white ball in its original position
    wBall.position = {
        x : tableWidth / 3, 
        y : (tableHeight / 2) - (wBall.size / 2)
    }

    // placing the direction line back in its original position
    line.position = {
        x : wBall.position.x + 25,      // 25 being the radius of the white ball 
        y : wBall.position.y + 25
    }

    // placing the coloured ball back in its original position
    ball.position = {
        x : randomX,
        y : randomY
    }

    // re-setting the coloured ball speed back to zero
    ball.speed = {x : 0, y : 0};

    // re-setting the rotation of the direction line
    line.rotation = 0;

    // re-setting the decreasing speed value of the white ball
    wBall.decreaseSpeed = 0;

    // re-setting the timer - re-setting at 60 + 1 to compensate for the loading delay
    counter = 31;

    // if level 5 not yet completed, move on to next level and display new level on screen
    // otherwise restart from level 1
    if (levelCounter === 5)
    {
        // play the applause sound
        applauseSound.play();
        
        // display pop-up message that all 5 levels are completed, and that the game will restart at level 1
        swal({
            title: "Good job!",
            text: "Well done you completed all 5 levels.  Restarting again from level 1.",
            icon: "success",
            button: "OK",
          });

        // setting the user points - function in validation.js file
        setPoints(userPoints);

        // start a new game from level 1
        restart();
    }
    else if (levelCounter < 5)
    {
        // increasing the level number
        levelCounter++;
        level.innerHTML = levelCounter;
    }
}


// to restart the game from level 1 - if the time is over or if the user completed level 5
function restart()
{
    wBall.moving = false;

    // placing the white ball in its original position
    wBall.position = {
        x : tableWidth / 3, 
        y : (tableHeight / 2) - (wBall.size / 2)
    }

    // placing the direction line back in its original position
    line.position = {
        x : wBall.position.x + 25,      // 25 being the radius of the white ball 
        y : wBall.position.y + 25
    }

    // placing the coloured ball back in its original position
    ball.position = {
        x : tableWidth * 2 / 3, 
        y : (tableHeight / 2) - (ball.size / 2)
    }

    // re-setting the coloured ball speed back to zero
    ball.speed = {x : 0, y : 0};

    // re-setting the rotation of the direction line, and the decreasing speed value of the white ball
    line.rotation = 0;
    wBall.decreaseSpeed = 0;

    // re-setting the timer - re-setting at 30 + 1 to compensate for the loading delay
    counter = 31;
     
    // re-setting the level - starting again from level 1
    levelCounter = 1;
    level.innerHTML = levelCounter;
}


// countdown number that updates every second (1000ms) displayed at the top-right of the page
function countdown()
{
    counter--;
    timer.innerHTML = counter;

    // counter reaches value zero - go to function gameover
    if (counter === 0)
    {
        gameover();
    }
}
setInterval(countdown, 1000);


// alert the user it is game over, and go to function restart, to reset everything and restart from level 1
function gameover()
{
    // play the game over sound
    gameOverSound.play();

    // display pop-up message that says game over and that game will restart from level 1
    swal({
        title: "Game Over!",
        text: "Restart from level 1",
        type: "input",
        button: "OK",
      });

    // setting the user points - function in validation.js file
    setPoints(userPoints);

    // start a new game from level 1
    restart();
}
