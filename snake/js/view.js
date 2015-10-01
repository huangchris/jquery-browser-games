(function(){
  if(window.Snake === undefined){
    window.Snake = {};
  }

  var Snake = window.Snake;

  Snake.View = function($view){
    this.$view = $view;
    this.setup();
  };

  Snake.View.prototype.setup = function(){
    this.$view.append("<ul class=grid></ul>");
    for(var i = 0; i < 10; i++) {
      $(".view .grid").append("<ul class=column id=column" + i + "></ul>");
      for(var j = 0; j < 10; j ++) {
        $("#column" + i).append("<li class=square id =square" + i + j + "></li>");
      }
    }
  };

  Snake.View.prototype.render = function(head, tail, food) {
    if (typeof food !== "undefined") {
      $(".food").toggleClass("food");
      $("#square" + food[0] + food[1]).toggleClass("food");
    }

    $("#square" + head[0] + head[1]).toggleClass("snake");
    if (typeof tail !== "undefined") {
      $("#square" + tail[0] + tail[1]).toggleClass("snake");
    }
  };
})();
