// --- ENEMY ---
var MOVE_MULTIPLY = 115;
var Enemy = function(initX, initY, move) {
    // Variables applied to each of our enemy instances go here,
    // we've provided one for you to get started
    this.x = initX;
    this.y = initY;
    this.move = move;
    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks

Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.x += this.move * dt;
    var levelWidth = 500;
    if (this.x > levelWidth) {
        this.x= -100;
        this.moveSpeed();
    }

};
//add variable movement, base movement speed set to 100 which can  be increaed by 2-5x base speed.
Enemy.prototype.moveSpeed = function() {
    this.move = MOVE_MULTIPLY * (Math.floor(Math.random() * 5) + 1);
};
//created reset function to ensure once bugs are off screen on the right they restart off screen on left.
Enemy.prototype.reset = function() {
    this.x = -100;
    this.MoveSpeed();
};
// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};


// --- PLAYER ---
// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
// create the base attributes for the player class
var initX = 200;
var initY = 400;
var player = function(){
    this.x = initX;
    this.y = initY;
    this.sprite = 'images/char-boy.png';
    this.water = 110;
    this.leftBoundry = 20;
    this.rightBoundry = 420;
    this.moveY = 85;
    this.moveX = 100;
};
// draw player sprite on screen
player.prototype.render = function(){
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};
// display ultimate victory and reset the game
player.prototype.update = function() {
    this.detectCollisions();
    if (this.y < 40 && this.y <= 400 && this.x >= 0 && this.x <= 400) {
    alert("V I C T O R Y !");
    this.playerReset();
  }
};
// log your embarassing defeat or cowardly attempt to flee to the console so none may learn of your failure.
player.prototype.detectCollisions = function() {
  for (var i = 0; i < allEnemies.length; i++) {
    var enemy = allEnemies[i];
    // Reset the game if plater collides with enemy.
    if (this.x >= enemy.x && this.x < (enemy.x + 50) && this.y >= enemy.y && this.y < (enemy.y + 85)) {
      this.playerReset();
      console.log('We Shall meet again in Valhalla brave warrior...');
    }
    // Reset the game if player leaves canvas.
    if (this.x < 0 || this.x > 400 || this.y > 400) {
      this.playerReset();
      alert('You have fled the battlefield!');
      console.log('You have fled the battlefield!');
    }
  }
};
//resets player position when water is reached
player.prototype.playerReset = function() {
    this.x = 200;
    this.y = 400;
};
//player movement around the canvas environment
player.prototype.handleInput = function(keyDown){
     switch (keyDown) {
        case 'up':
            if (this.y === this.water) {
                return null;
            } else {
                this.y -= this.moveY;
            }
            break;
        case 'down':
            if (this.y === this.initY) {
                return null;
            } else {
                this.y += this.moveY;
            }
            break;
        case 'left':
            if (this.x === this.leftBoundry) {
                return null;
            } else {
                this.x -= this.moveX;
            }
            break;
        case 'right':
            if (this.x === this.rightBoundry) {
                return null;
            } else {
                this.x += this.moveX;
            }
            break;
        default:
            return null;
    }
};
// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
var player = new player();
var allEnemies = [];

for (var i = 0; i < 3; i++) {
    var baseMove = MOVE_MULTIPLY * (Math.floor(Math.random() * 5) + 1);
    allEnemies.push(new Enemy(-100, 60 + 85 * i, baseMove));
}


// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
