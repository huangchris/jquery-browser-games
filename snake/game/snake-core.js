if(window.Snake === undefined){
  window.Snake = {};
}

var Snake = window.Snake;

var Game = Snake.Game = function(view){
  this.view = view;
  this.board = this.setGrid();
  this.snake = [[0,0]];
  this.direction = [1,0];
  this.food = [2,0];//this.genFood();
  this.speed = 500;
  this.view.render(this.snake[0], undefined, this.food);
  this.run();
};

Game.prototype.setGrid = function() {
  var array = [];
  for (var i = 0; i < 10; i++) {
    array.push([]);
  }
  return array;
};

Game.prototype.genFood = function (newPos) {
  var foodLoc = [Math.floor(Math.random()*10), Math.floor(Math.random()*10)];
  var newSnake = this.snake.slice();
  newSnake.push(newPos);

  if (newSnake.some(function(el) {
    return el[0] === foodLoc[0] && el[1] === foodLoc[1];
  })) {
    return this.genFood(newPos);
  }

  return foodLoc;
};

Game.prototype.run = function () {
  var that = this;
  var timerID = setInterval(function(){
    that.move(timerID);
  },this.speed);
  setInterval(function(){
    this.speed -= 50;
  }, 10000);
};

Game.prototype.move = function (timerID) {
  var newPos = [];
  newPos[0] = this.snake[this.snake.length - 1][0] + this.direction[0];
  newPos[1] = this.snake[this.snake.length - 1][1] + this.direction[1];
  newPos = wrap(newPos);
  var food;
  var tail;
  if(this.foodEaten(newPos)){
    this.food = this.genFood(newPos);
    food = this.food;
  }
  else{
    tail = this.snake[0];
    this.snake.shift();
  }
  if(this.lostGame(newPos)){
    clearInterval(timerID);
    alert("You lose");
  }
  else{
    this.snake.push(newPos);
    this.view.render(newPos, tail, food);
  }
};

var wrap = function(pos){
  pos.forEach(function(el, idx){
    if (el === 10){
      pos[idx] = 0;
    }
    else if (el === -1){
      pos[idx] = 9;
    }
  });
  return pos;
};

Game.prototype.lostGame = function (newPos) {
  return this.snake.some(function(el) {
    return el[0] === newPos[0] && el[1] === newPos[1];
  });
};

Game.prototype.foodEaten = function (pos) {
  return pos[0] === this.food[0] && pos[1] === this.food[1];
};

Game.prototype.bindEvents = function(){
  window.key("left", function(){ window.game.changeDirection([-1, 0]);});
  window.key("right", function(){ window.game.changeDirection([1, 0]);});
  window.key("up", function(){ window.game.changeDirection([0,-1]);});
  window.key("down", function(){ window.game.changeDirection([0,1]);});
};

Game.prototype.changeDirection = function(newDir) {
  if(this.direction[0] + newDir[0] === 0|| this.direction[1] + newDir[1] === 0){}
  else{
    this.direction = newDir;
  }
};
