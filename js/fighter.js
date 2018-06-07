function Fighter(ctx) {
    this.ctx = ctx;

    this.img = new Image();
    this.img.frameIndex = 0;

    this.x = this.ctx.canvas.width - 300; 
    this.y0 = 400;
    this.y = this.y0;

    this.vx = 30;
    this.vy = 0; 
    this.gravity = 0.5;

    this.faced = null;

    this.attack = false;
    this.defend = false;

    this.img.animateEvery = 15;
    this.drawCount = 0;

    this.state = 'stand';
    this.health = 100;
    //this.barPos = 10;

    this.healthbar = new HealthBar(this.ctx, this.health);
    this.keys = [];
    
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
        case 'kick': 
            this.kick(); 
            break;
        case 'bend':
            this.bend();
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
        this.y, 
        this.width , 
        this.height
    );

    if (this.drawCount % this.img.animateEvery === 0){
       this.animate();
        this.drawCount = 0;
    }

    this.healthbar.draw();

    //this.checkIfFaced();
}

Fighter.prototype.checkIfFaced = function(rival) {
    //console.log(rival);
    var myPos = this.x + this.width;
    var rivPos = rival.x + rival.width;

    myPos > rivPos ? this.faced = 'left' : this.faced = 'right';
}

// Basic Movements
Fighter.prototype.stand = function() {
    this.state = 'stand';
    this.attack = false;
    this.defend = false;

    this.img.rowIndex = 0;
    this.width = 145;
    this.height = 167;
    this.img.frames = 4;
    this.img.animateEvery = 15;
    this.y = this.y0;

    if(this.img.frameIndex >= this.img.frames) {
        this.img.frameIndex = 0;
    }
    
}

Fighter.prototype.jump = function() {

    this.state = 'jump';
 
    this.attack = false;
    this.defend = false;

    this.img.rowIndex = 550;
    this.width = 145; 
    this.height = 180; 
    this.img.frames = 6;
    this.img.animateEvery = 8;

    this.vy += this.gravity;
    this.y *= this.vy;

    // if(this.img.frameIndex >= this.img.frames) {
    //     this.img.frameIndex = 0;
    // }

    if(!this.isJumping()){   
        this.vy = 0; 
        this.y = this.y0;
        this.state = 'stand'
        this.stand()
    }

}

Fighter.prototype.isJumping = function(){
    return this.y < this.y0;
}


Fighter.prototype.move = function(){
    //this.state = 'move';
    if(this.x <= 0) return;

    this.faced = 'left' ? this.x -= this.vx : this.x += this.vx;

    this.attack = false;
  
    this.img.rowIndex = 165; 
    this.width = 145;
    this.height = 180; 
    this.img.frames = 6;
    this.img.animateEvery = 30;

    //this.x -= this.vx;
}

Fighter.prototype.goBack = function() {
    //this.state = 'go-back'; 

    if(this.x + this.width >= this.ctx.canvas.width ) return

    this.faced = 'left' ? this.x += this.vx : this.x -= this.vx;

    this.attack = false;
    this.defend = true;

    this.img.rowIndex = 345; 
    this.width = 145; 
    this.height = 205; 
    this.img.frames = 6;
    this.img.animateEvery = 15;

    //this.x += this.vx;
}

Fighter.prototype.punch = function() {
    this.state = 'punch';
    
    this.attack = true;
    this.defend = false;

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
    this.defend = false;

    this.img.rowIndex = 935;
    this.img.frames = 5; 
    this.width = 185;
    this.height = 215; 
    this.img.animateEvery = 5;
    this.y = 365; 

    if(this.img.frameIndex >= this.img.frames) {
        this.img.frameIndex = 0;
        this.stand();
    }
}

Fighter.prototype.bend = function(){
    this.state = 'bend';
    this.attack = false;
    this.defend = true;

    this.img.rowIndex = 1155;
    this.img.frames = 2; 
    this.width = 135; 
    this.height = 145;
    this.y = 420

    if(this.img.frameIndex >= this.img.frames) {
        this.img.frameIndex = 0;
        this.stand();
    }
}

Fighter.prototype.updateDamage = function(){
    this.health--;
    this.healthbar.width -= 5 //TODO: restar a health la fuerza de cada ataque
    this.displace();

    console.log(this.health);
}

Fighter.prototype.displace = function(){

    this.img.rowIndex = 1295;
    this.width = 130; 
    this.height = 180; 
    this.img.frames = 5;
    this.img.animateEvery = 10;

    if(this.x + this.width >= this.ctx.canvas.width || this.x <= 0) {
        return
    } else {
        this.faced === 'right' ? this.x -= 30 : this.x += 30
    }

}

Fighter.prototype.receiveDamage = function(rival) {
    var rx = (rival.x <= this.x + this.width) && (this.x <= rival.x + rival.width);

    var ry = this.y + this.height >= rival.y;

    if(this.isDead()) {
        this.state = 'dead';
        
        rival.state = 'win';
    }

    if(rx && ry){
        this.updateDamage();
        console.log('toma hostia');
    }  
}

Fighter.prototype.isDead = function() {
    return this.health <= 0;
}

Fighter.prototype.lose = function() {
    // call to sprite frames when fighter dies
    // stop game
}

Fighter.prototype.win = function() {
    // call to sprite frames when fighter wins
    
}