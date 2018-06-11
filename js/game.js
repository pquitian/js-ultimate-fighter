function Game(canvas) {
    this.ctx = canvas.getContext("2d");
    
    this.projectile = [];

    this.bg = new Landscape(this.ctx);

    this.goku = new Goku(
        this.ctx, 
        "img/fighters/goku_6.png", 
        this.projectile
    );

    this.ryu = new Ryu(
        this.ctx, 
        "img/fighters/ryu_6.png",
        this.projectile
    );

    this.keys = [];
    this.setListeners();

    this.endTheme = new Audio('sounds/theme/end-theme_' + Math.round( (Math.random() * 3) + 1) + '.wav' );
}

Game.prototype.start = function() {
    this.soundTheme = new Audio('sounds/theme/main-theme_' + Math.round( (Math.random() * 1) + 1) + '.mp3' );
    this.soundTheme.play();

    this.intervalId = setInterval(function() {
        this.drawAll();
        this.playerFaced();
        this.fight();

        this.checkCollisions();

    }.bind(this), 16);

    
};

Game.prototype.checkCollisions = function() {
    this.projectile.forEach(function(p) {
        var target = p.fighter === this.goku ? this.ryu : this.goku;

        if (target.collide(p)) {
            target === this.goku ? this.ryu.crashProjectile(p, target) : this.goku.crashProjectile(p, target);
            target.updateDamage();
        }
    }.bind(this))
}

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
        //clearInterval(this.intervalId);
        this.gameOver();
    }
}


Game.prototype.setListeners = function() {
   
    document.onkeydown = function(e) {
        
        this.keys[e.keyCode] = true;
        
        switch(e.keyCode){
            //Goku
            case 37:
                this.goku.move();
                break;
            case 39:
                this.goku.goBack();
                break;
            case 38:
                this.goku.jump();
                this.goku.gokuJump.play();
                break;
            case 77: 
                this.goku.punch();
                this.goku.gokuPunch.play();
                break;
            case 78:
                this.goku.kick();
                this.goku.gokuKick.play();
                break;
            case 40:
                this.goku.bend();
                break; 
            case 32: 
                this.goku.highKick();
                this.goku.gokuHighKick.play(); 
                break;
            case 16:
                this.goku.specialAttack();
                this.goku.gokuKame.play();
                break; 
            //Ryu
            case 87:
                this.ryu.jump();
                this.ryu.ryuJump.play();
                break;
            case 65:
                this.ryu.move();
                break;
            case 68:
                this.ryu.goBack();
                break;
            case 49:
                this.ryu.punch();
                this.ryu.ryuPunch.play();
                break;
            case 50:
                this.ryu.kick();
                this.ryu.ryuKick.play();
                break;
            case 83:
                this.ryu.bend();
                break;
            case 52: 
                this.ryu.highKick();
                this.ryu.ryuHighKick.play();
                break;
            case 84: 
                this.ryu.specialAttack();
                this.ryu.ryuHadouken.play();
                break;
        }

   }.bind(this)
   
   document.onkeyup = function(event) {
       this.keys[event.keyCode] = false;  
   }.bind(this)
}

Game.prototype.gameOver = function(){
    this.soundTheme.pause();
    this.endTheme.play();

    this.status = 'game-over';

    document.onkeydown = null;

    if(this.goku.isDead()){
        this.goku.dies();
        this.ryu.win();
        //clearInterval(this.intervalId)
    }
    if(this.ryu.isDead()){
        
        this.ryu.dies();
        this.goku.win();
    }

}



