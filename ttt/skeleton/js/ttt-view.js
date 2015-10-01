(function () {
  if (typeof TTT === "undefined") {
    window.TTT = {};
  }

  var View = window.TTT.View = function (game, $el) {
    this.$el = $el;
    this.game = game;
    this.setupBoard();
  };

  View.prototype.bindEvents = function () {
    var that = this;
    $("li").on("click", function (e) {
      that.makeMove($(e.currentTarget));
    });
  };

  View.prototype.makeMove = function ($square) {
    var pos = [];
    pos[0] = Math.floor($square.attr("id") / 3);
    pos[1] = Math.floor($square.attr("id") % 3);
    if(this.game.board.isEmptyPos(pos)){
      var mark = this.game.currentPlayer;
      $square.attr("class", mark);
      $square.append(mark);
      this.game.playMove(pos);
    }
    else{
      alert("Not a valid move");
    }
    this.checkVictory();
  };

  View.prototype.checkVictory = function () {
    if(this.game.isOver()){
      var winner = this.game.winner();
      if(winner === null){
        alert("Game over! Draw.");
      }
      else{
      alert("Winner is " + winner);
      }
    }

  };

  View.prototype.setupBoard = function () {
    this.$el.append("<ul class=board></ul>");
      var $board = $(".board");
      for (var i = 0; i < 9; i++) {
          $board.append("<li class=square id=" + i + " ></li>");
      }
  };
})();
