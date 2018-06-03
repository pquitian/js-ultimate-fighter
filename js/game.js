function Game(canvas) {
    this.ctx = canvas.getContext("2d");
    
    this.bg = new Landscape(this.ctx);
    this.fighter = new Fighter(this.ctx);

    this.goku = new Goku(
        this.ctx, 
        "img/fighters/goku_3.png", 
    );

    this.ryu = new Ryu(
        this.ctx, 
        "img/fighters/ryu_3.png", 
    );

    this.setKeyboardListeners();
    
}

Game.prototype.start = function() {
    this.soundTheme = new Audio('sounds/gbz-theme.mp3');
    this.soundTheme.play();

    this.intervalId = setInterval(function() {
        this.drawAll();
        this.fight();
    }.bind(this), 16);

    
};

Game.prototype.drawAll = function(){
    this.bg.draw();
    
    this.goku.draw();
    this.ryu.draw();

}

Game.prototype.fight = function() {
    if(this.goku.attack){
        var dx = (this.goku.x <= this.ryu.x + this.ryu.width) && (this.ryu.x <= this.goku.x + this.goku.width);

        var dy = this.ryu.y + this.ryu.height >= this.goku.y;

        if(dx && dy){
            this.ryu.receiveDamage();
            console.log('toma hostia');
        }  
    }
    
}

Game.prototype.setKeyboardListeners = function() {
    document.onkeydown = function(event) {
      this.goku.onKeyDown(event.keyCode);
      this.ryu.onKeyDown(event.keyCode);
      this.soundHandler();
    }.bind(this);
  
    document.onkeyup = function(event) {
      this.goku.onKeyUp(event.keyCode);
      this.ryu.onKeyUp(event.keyCode);
    }.bind(this);
};

Game.prototype.soundHandler = function() {
    var gokuPunch = new Audio('sounds/goku/punch.wav');
    var gokuKick = new Audio('sounds/goku/kick.wav');
    var gokuJump = new Audio('sounds/goku/jump.wav');

    switch(this.goku.state){
        case 'punch':
            gokuPunch.play();
            break;
        case 'kick':
            gokuKick.play();
            break; 
        case 'jump':
            gokuJump.play();
            break;
    }

    
}

