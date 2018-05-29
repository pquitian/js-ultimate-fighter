function Game(canvas) {
    this.ctx = canvas.getContext("2d");
    
    this.bg = new Landscape(this.ctx);
    this.fighter = new Fighter(this.ctx);
    this.goku = new Goku(this.ctx);


    this.setKeyboardListeners();
}

Game.prototype.start = function() {
    this.intervalId = setInterval(function() {
        this.drawAll();
    }.bind(this), 16);
};

Game.prototype.drawAll = function(){
    this.bg.draw();
    this.fighter.draw();
}

Game.prototype.moveAll = function(){
    this.fighter.stand();
    this.fighter.move();
    this.fighter.goBack();
}

Game.prototype.fight = function() {
    this.fighter.punch();
}

Game.prototype.setKeyboardListeners = function() {
    document.onkeydown = function(event) {
      this.fighter.onKeyDown(event.keyCode);
    }.bind(this);
  
    document.onkeyup = function(event) {
      this.fighter.onKeyUp(event.keyCode);
    }.bind(this);
  };