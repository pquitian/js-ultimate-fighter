function Fighter(ctx) {
    this.ctx = ctx;

    this.img = new Image();
    this.img.frameIndex = 0;

    this.x = this.ctx.canvas.width - 300; 
    this.y0 = 400;
    this.y = this.y0;

    this.vx = 5;
    this.vy = 0; 
    this.gravity = 0.5;

    this.fight = false;
    this.isJumping = false;

    this.img.animateEvery = 15;
    this.drawCount = 0;

    this.state = 'stand';
    this.health = 100;
    
}

Fighter.prototype.animate = function() {
    this.img.frameIndex++;
    switch(this.state) {
        case 'stand':
            this.stand();
            break;
        case 'punch':
            this.punch();
            break;
        case 'move': 
            this.move();
            break;
        case 'go-back': 
            this.goBack();
            break;
        case 'jump':
            this.jump();
            break;
        case 'jump&move':
            this.jump();
            this.move();
            break;
        case 'kick': 
            this.kick(); 
            break;
    }

    
}

Fighter.prototype.draw = function() {
    this.drawCount++;
    
    this.ctx.drawImage(
        this.img,
        this.img.frameIndex * this.width,
        this.img.rowIndex, 
        this.width,
        this.height,
        this.x, 
        this.y0, 
        this.width , 
        this.height
    );

    if (this.drawCount % this.img.animateEvery === 0){
       this.animate();
        this.drawCount = 0;
    }
    
}

// Basic Movements
Fighter.prototype.stand = function() {
    this.state = 'stand';
    this.attack = false;

    this.img.rowIndex = 0;
    this.width = 145;
    this.height = 167;
    this.img.frames = 4;
    this.img.animateEvery = 15;
    this.y0 = 400;

    if(this.img.frameIndex >= this.img.frames) {
        this.img.frameIndex = 0;
    }
}

Fighter.prototype.jump = function() {

    this.isJumping = true; 
    this.attack = false;

    this.img.rowIndex = 550;
    this.width = 145; 
    this.height = 180; 
    this.img.frames = 6;
    this.img.animateEvery = 6;

    this.vy += this.gravity;
    this.y0 *= this.vy;

    if(this.y0 >= this.y){
        this.vy = 0; 
        this.y0 = this.y;
        this.isJumping = false;
        this.state = 'stand'
    }

}

Fighter.prototype.bend = function() {

}


Fighter.prototype.move = function(){
    //this.state = 'move';
    if(this.x <= 0) return;

    this.attack = false;
  
    this.img.rowIndex = 165; 
    this.width = 145;
    this.height = 180; 
    this.img.frames = 6;
    this.img.animateEvery = 30;
    
    if (this.isJumping === true) {
        this.state = 'jump&move';
    }

    this.x -= this.vx;
}

Fighter.prototype.goBack = function() {
    //this.state = 'go-back'; 

    if(this.x + this.width >= this.ctx.canvas.width ) return

    this.attack = false;

    this.img.rowIndex = 345; 
    this.width = 145; 
    this.height = 205; 
    this.img.frames = 6;
    this.img.animateEvery = 15;

    this.x += this.vx;
}

Fighter.prototype.punch = function() {
    this.state = 'punch';
    
    this.attack = true;

    this.img.rowIndex = 755;
    this.img.frames = 6;
    this.width = 200;
    this.height = 180;
    this.img.animateEvery = 5;

    if(this.img.frameIndex >= this.img.frames) {
        this.img.frameIndex = 0;
        this.stand();
    }
}

Fighter.prototype.kick = function(){
    this.state = 'kick';
    this.attack = true;

    this.img.rowIndex = 935;
    this.img.frames = 5; 
    this.width = 185;
    this.height = 215; 
    this.img.animateEvery = 5; 

    if(this.img.frameIndex >= this.img.frames) {
        this.img.frameIndex = 0;
        this.stand();
    }
}

Fighter.prototype.damaged = function(){
    this.health--;
    //TODO: restar a health la fuerza de cada ataque
}


//Key listeners

Fighter.prototype.onKeyDown = function(code) {
    switch(code) {
        case this.RIGHT:
            this.goBack();
            break;
        case this.LEFT:
            this.move();
            break;
        case this.PUNCH: 
            this.punch();
            break;
        case this.TOP: 
            this.jump();
            break;
        case this.KICK: 
            this.kick();
            break;
    }
};


Fighter.prototype.onKeyUp = function(code) {
    switch(code) {
        
    }
    
};

