function Fighter(ctx) {
    this.ctx = ctx;

    this.img = new Image();
    this.img.src = "img/fighters/goku-fw.png";
    this.img.frameIndex = 0;
    this.img.rowIndex = 245;
        

    this.width = 115;
    this.height = 113;

    this.x = this.width * 3;
    this.y0 = (this.ctx.canvas.height) - 250 ;
    this.y = this.y0;

    this.vx = 50;

    this.faceRight = true;
    this.faceLeft = false;
    this.fight = false;

    this.img.animateEvery = 15;
    this.drawCount = 0;
}

Fighter.prototype.draw = function() {
    this.drawCount++;
    this.img.frames = 4;
    this.ctx.drawImage(
        this.img,
        this.img.frameIndex * this.width,
        this.img.rowIndex + this.height, 
        this.width,
        this.height,
        this.ctx.canvas.width - this.x, 
        this.y0, 
        this.width * 2, 
        this.height * 2
    );

    if(this.drawCount % this.img.animateEvery === 0){
        this.stand();
        this.drawCount = 0;
    }
}

// Basic Movements
Fighter.prototype.stand = function() {
    this.img.frameIndex++;
    if(this.img.frameIndex >= this.img.frames) {
        this.img.frameIndex = 0;
    }
}

Fighter.prototype.move = function(){
    if(this.x >= this.ctx.canvas.width) return;
    this.x += this.vx;
}

Fighter.prototype.goBack = function() {
    //if(this.x + this.width >= this.ctx.canvas.width) return;s
    this.x -= this.vx;
}

Fighter.prototype.punch = function() {
    this.img.rowIndex = 2010;
    this.img.frames = 6;
    this.width = 130;
    this.height = 130;

    this.draw();
    if(this.img.frameIndex >= this.img.frames) {
        this.img.frameIndex = 0;
    } 
}


//Key listeners
Fighter.prototype.TOP = 38;
Fighter.prototype.DOWN = 40;
Fighter.prototype.LEFT = 37;
Fighter.prototype.RIGHT = 39;
Fighter.prototype.PUNCH = 77;

Fighter.prototype.onKeyDown = function(code) {

    switch(code) {
    //   case this.TOP:
    //     this.jump();
    //     break;
        case this.RIGHT:
            this.goBack();
            break;
        case this.LEFT:
            this.move();
            break;
    //   case this.DOWN:
    //     this.startBend();
    //     break;
    //   case this.SHOOT:
    //     this.shoot();
    //     break;
        case this.PUNCH: 
            this.punch();
            break;
    }
};


Fighter.prototype.onKeyUp = function(code) {
    switch(code) {
        case this.PUNCH:
            this.stand();
            break;
    }
    
};