(function () {
  if (typeof window.Hanoi === "undefined") {
    window.Hanoi = {};
  }

  var Hanoi = window.Hanoi;

Hanoi.View = function(game, viewEl) {
  this.game = game;
  this.viewEl = viewEl;
  this.setup();
};

Hanoi.View.prototype.setup = function() {

  for (var i = 0; i < 3; i++) {
    this.viewEl.append("<ul class=towerStack id=" + i + " ></ul>");
  }
  for(i = 0; i < 3; i++){
    var stack = $("#" + i);
    stack.append("<li class=small></li>");
    stack.append("<li class=medium></li>");
    stack.append("<li class=large></li>");
  }
  $("#1 li, #2 li").attr("class", "empty");
};

Hanoi.View.prototype.bindEvents = function () {
  // body...
  var that = this;
  this.moveFrom = null;
  $("ul").on("click", function (e) {
    if(that.moveFrom === null){
      that.moveFrom = $(e.currentTarget).attr("id");
    }
    else{
      that.makeMove(that.moveFrom, $(e.currentTarget).attr("id"));
      that.moveFrom = null;
    }
    that.render();
  });
};

Hanoi.View.prototype.makeMove = function (fromIdx, toIdx) {
  // body...
  if(this.game.isValidMove(fromIdx, toIdx)){
    this.game.move(fromIdx, toIdx);
  }
  else if(fromIdx === toIdx){}
  else{
    alert("Invalid Move");
  }
  if(this.game.isWon()){
    $("li").css("background-color", "cornflowerblue");
    alert("You Win");
  }
};

Hanoi.View.prototype.render = function() {
  var keys = ["empty", "small", "medium", "large"];
  if (this.moveFrom) {
    $("#"+this.moveFrom).toggleClass("selected");
  } else {
    $("ul").removeClass("selected");
  }

  this.game.towers.forEach( function(array, idx) {
    for (var i = 0; i < 3; i++ ) {
      var klass = array[i];
      if (klass === undefined) {
        klass = 0;
      }
      $("#"+idx+ " li").eq(2 - i).attr("class", keys[klass]);
    }
  });

};

})();
