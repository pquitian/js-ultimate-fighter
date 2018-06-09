function Game(canvas) {
    this.ctx = canvas.getContext("2d");
    
    this.bg = new Landscape(this.ctx);
    this.fighter = new Fighter(this.ctx);

    this.goku = new Goku(
        this.ctx, 
        "img/fighters/goku_4.png", 
    );

    this.ryu = new Ryu(
        this.ctx, 
        "img/fighters/ryu_4.png", 
    );

    

    this.keys = [];
    this.setListeners();

}

Game.prototype.start = function() {
    this.soundTheme = new Audio('sounds/gbz-theme.mp3');
    this.soundTheme.play();

    this.intervalId = setInterval(function() {
        this.drawAll();
        this.playerFaced();
        this.fight();

    }.bind(this), 16);
    
};

// Game.prototype.setKeyboardListeners = function() {
    
//          this.ryu.onKeyDown(event.keyCode);
//          this.soundHandler();
// }

Game.prototype.drawAll = function(){
    
    this.bg.draw();
    
    this.goku.draw();
    this.ryu.draw();
    
}

Game.prototype.playerFaced = function() {
    this.goku.checkIfFaced(this.ryu);
    this.ryu.checkIfFaced(this.goku);

    //console.warn('Goku:' + this.goku.faced);
    //console.log('Ryu: ' + this.ryu.faced);
}

Game.prototype.fight = function() {
    if(this.goku.attack) {
      this.ryu.receiveDamage(this.goku)
    }

    if (this.ryu.attack) {
        this.goku.receiveDamage(this.ryu)
    }

    if (this.goku.isDead() || this.ryu.isDead()) {
        clearInterval(this.intervalId);
    }
}


Game.prototype.setListeners = function() {
   
    document.onkeydown = function(e) {
        
        this.keys[e.keyCode] = true;
        

        if(this.keys[87]) this.ryu.jump();
        if(this.keys[65]) this.ryu.move();
        if(this.keys[68]) this.ryu.goBack();
        if(this.keys[49]) this.ryu.punch();
        if(this.keys[50]) this.ryu.kick();
        if(this.keys[83]) this.ryu.bend();


        // Goku
        if(this.keys[37]) this.goku.move();
        if(this.keys[39]) this.goku.goBack();
        if(this.keys[38]) {
            this.goku.jump();
            this.goku.gokuJump.play();
        } 
        if(this.keys[77]){
            this.goku.punch();
            this.goku.gokuPunch.play();
        } 
        if(this.keys[78]){
            this.goku.kick();
            this.goku.gokuKick.play();
        } 
        if(this.keys[40]) this.goku.bend();

   }.bind(this)
   
   
   document.onkeyup = function(event) {
       this.keys[event.keyCode] = false;  
   }.bind(this)
}

Game.prototype.gameOver = function(){
    console.log('GAME OVER');
}



