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
                     // checking if ball when out of play area and updating its x-coordinate
                    // to not allow the ball bounce on the same spot
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
                    // checking if ball when out of play area and updating its x-coordinate
                    // to not allow the ball bounce on the same spot
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

            checkWhiteCollision();

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
    constructor(colour, pos)  // need to add white ball speed as parameters ????????
    {
        // getting the image of the coloured ball
        this.image = document.getElementById(colour);

        // size of the ball - width and height
        this.size = 50;

        // starting position of the ball
        this.position = {
            x : pos.x, 
            y : pos.y
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

    // update the position of the ball
    // parameters - time elapsed, position of white ball, decreaseSpeed value
    update(deltaTime)
    {
        // to go back and display ball - for the very first time that this method is called
        if (!deltaTime) return;

        // if the ball is moving, and decreaseSpeed has not reached a value of 300 - i.e. the ball is not moving very slowly..
        if ((this.decreaseSpeed !== 0) && (this.decreaseSpeed < 300))
        {
            // incresing the value of this.decreaseSpeed
            this.decreaseSpeed += 1;

            // update the position of the ball, by updating the x- and y- position
            // the incrementing decreaseSpeed is added to deltaTime, to always decrease the speed of the ball with each iteration 
            this.position.x += this.speed.x / (deltaTime + this.decreaseSpeed);
            this.position.y += this.speed.y / (deltaTime + this.decreaseSpeed);

            // checking if any of the balls collided with each other
            checkBallsCollision();

            // if the ball reaches the left or right end
            if (this.position.x < playAreaStartX || this.position.x > playAreaEndX)
            {
                // if ball has hit one of the holes in the corners (allowing 10 discrepancy from the exact hole point)
                if ((this.position.y < (playAreaStartY + 10)) || (this.position.y > (playAreaEndY - 10)))
                {
                    // play the pocket sound
                    pocketSound.play();

                    // increment the number of pocketed balls
                    ballsCounter += 1;

                    // hiding this ball
                    this.position.x = -5000;
                    this.position.y = -5000;

                    // if all balls have been pocketed
                    if (ballsCounter === 3)
                    {
                        // play the applause sound
                        applauseSound.play();

                        // display pop-up message that says game over and that game will restart from scratch
                        swal({
                            title: "Good job!",
                            icon: "success",
                            button: "OK",
                        });

                        // restart the game
                        restart();
                    }       
                }

                // if ball did not hit one of the holes, reverse the direction of the x-axis
                else
                {
                    // checking if ball when out of play area and updating its x-coordinate
                    // to not allow the ball bounce on the same spot
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
                // if ball has hit one of the holes in the corners (allowing a discrepancy from the exact hole point)
                if ((this.position.x > (middleHoleStart - 5)) && (this.position.x < (middleHoleEnd + 25)))
                {
                    // play the pocket sound
                    pocketSound.play();

                    // increment the number of pocketed balls
                    ballsCounter += 1;

                    // hiding this ball
                    this.position.x = -5000;
                    this.position.y = -5000;

                    // if all balls have been pocketed
                    if (ballsCounter === 3)
                    {
                        // play the applause sound
                        applauseSound.play();

                        // display pop-up message that says game over and that game will restart from scratch
                        swal({
                            title: "Good job!",
                            icon: "success",
                            button: "OK",
                        });

                        // restart the game
                        restart();
                    }       
                }

                // if ball did not hit one of the holes, reverse the direction of the y-axis
                else
                {
                    // checking if ball when out of play area and updating its x-coordinate
                    // to not allow the ball bounce on the same spot
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
let line = new Line();

// initiating an instance of the white ball
let wBall = new WhiteBall();

// the starting position for each ball
let rPos = {x:800,y:300};
let bPos = {x:845,y:270};
let yPos = {x:845,y:330};

// initiating the 3 colour balls
let balls = [];
balls[0] = new ColourBall("redBall", rPos);
balls[1] = new ColourBall("blueBall", bPos);
balls[2] = new ColourBall("yellBall", yPos);

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

// timer displayed at the top-right of the page
let counter = 0;
let timer2 = document.getElementById("timer2");

// creating an object that will include all the objects for the game
let gameObjects = [wBall, balls[0], balls[1], balls[2], line];

// counter to count the number of pocketed balls
let ballsCounter = 0;


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
    
    // loop that calls the update method of each object in the game (white ball, coloured balls, line)
    gameObjects.forEach((object) => object.update(deltaTime));

    // loop that calls the draw method of each object in the game (white ball, coloured balls, line)
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

    // placing the coloured balls back in their original position
    balls[0].position = rPos;
    balls[1].position = bPos;
    balls[2].position = yPos;

    // re-setting the coloured balls' speed back to zero
    balls[0].speed = {x : 0, y : 0};
    balls[1].speed = {x : 0, y : 0};
    balls[2].speed = {x : 0, y : 0};

    // re-setting the rotation of the direction line, and the decreasing speed value of the white ball
    line.rotation = 0;
    wBall.decreaseSpeed = 0;

    // re-setting the timer 
    counter = 0;

    // re-setting the counter for pocketed balls
    ballsCounter = 0;
}


// timer that updates every second (1000ms) displayed at the top-right of the page
function timer()
{
    counter++;
    timer2.innerHTML = counter;
}
setInterval(timer, 1000);


// to check if any of the coloured balls collided with each other
function checkBallsCollision()
{
    let collisionAngle = 0;

    for(let i = 0; i < 3; i++)
    {
        for (let n = 0; n < 2; n++)
        {
            // checking if balls collide with each other
            if ((Math.abs(balls[n].position.x - balls[n+1].position.x) <= 50) && (Math.abs(balls[n].position.y - balls[n+1].position.y) <= 50))
            {
                collisionAngle = Math.atan2(Math.abs(balls[n].position.y - balls[n+1].position.y), Math.abs(balls[n].position.x - balls[n+1].position.x));

                // if they hit perpendicularly, reverse the direction of both balls
                if (collisionAngle === 0)
                {	
                    balls[n].speed.x = -balls[n].speed.x;    
                    balls[n].speed.y = -balls[n].speed.y;
                    balls[n+1].speed.x = -balls[n+1].maxSpeed.x;    
                    balls[n+1].speed.y = -balls[n+1].maxSpeed.y;
                    balls[n+1].decreaseSpeed = wBall.decreaseSpeed;
                    balls[n].decreaseSpeed = wBall.decreaseSpeed;
                }
                else
                {	
                    balls[n].speed.x = balls[n].speed.x * Math.cos(collisionAngle);
                    balls[n].speed.y = balls[n].speed.y * Math.sin(collisionAngle);

                    balls[n+1].speed.x = balls[n+1].maxSpeed.x * Math.cos(collisionAngle + 1.5708);
                    balls[n+1].speed.y = balls[n+1].maxSpeed.y * Math.sin(collisionAngle + 1.5708);
                    balls[n+1].decreaseSpeed = wBall.decreaseSpeed;
                    balls[n].decreaseSpeed = wBall.decreaseSpeed;
                }
                    
                collisionSound.play();
            }
        }
    }
}


// to check if white ball collided with any of the coloured balls
function checkWhiteCollision()
{
    let collisionAngle = 0;

    for (let n = 0; n < 3; n++)
    {
        // checking if balls collide with each other
        if ((Math.abs(balls[n].position.x - wBall.position.x) <= 50) && (Math.abs(balls[n].position.y - wBall.position.y) <= 50))
        {
            collisionAngle = Math.atan2(Math.abs(balls[n].position.y - wBall.position.y), Math.abs(balls[n].position.x - wBall.position.x));

            // if they hit perpendicularly, reverse the direction of both balls
            if (collisionAngle === 0)
            {	
                balls[n].speed.x = -balls[n].maxSpeed.x;    
                balls[n].speed.y = -balls[n].maxSpeed.y;
                balls[n].decreaseSpeed = wBall.decreaseSpeed;

                wBall.speed.x = -wBall.speed.x;    
                wBall.speed.y = -wBall.speed.y;
            }
            else
            {	
                balls[n].speed.x = balls[n].maxSpeed.x * Math.cos(collisionAngle);
                balls[n].speed.y = balls[n].maxSpeed.y * Math.sin(collisionAngle);
                balls[n].decreaseSpeed = wBall.decreaseSpeed;

                wBall.speed.x = wBall.speed.x * Math.cos(collisionAngle + 1.5708);
                wBall.speed.y = wBall.speed.y * Math.sin(collisionAngle + 1.5708);
            }
                
            collisionSound.play();
        }
    }
}