function Fighter(ctx, projectile) {
    this.ctx = ctx;

    this.img = new Image();
    this.img.frameIndex = 0;

    this.fighterShot = new Image();
    this.shotX = null, 
    this.shotY = 50,

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
    this.hasDied = false;
    this.health = 100;

    this.healthbar = new HealthBar(this.ctx, this.health);
    this.keys = [];

    this.projectile = projectile;
    this.damageSound = new Audio('sounds/damage.wav');
    
}

Fighter.prototype.collide = function(p) {
    if(this.faced === 'right'){
        var xaxis = p.x < this.x + this.width;
        var yaxis = p.x < this.y;
        return xaxis && yaxis;
    } else {
        return p.x > this.x;
    }
}

Fighter.prototype.crashProjectile = function(p, target) {
    this.projectile.pop();
    target.health -= 5; 
    target.healthbar.width -= 25;
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
        case 'special-attack':
            this.specialAttack();
            break;
        case 'high-kick':
            this.highKick();
            break;
    }
}

Fighter.prototype.drawShot = function() {
    this.ctx.drawImage(
        this.fighterShot,
        this.shotX, 
        this.shotY, 
        80, 
        80 
    );
}

Fighter.prototype.drawPlayerName = function() {
    this.ctx.font = "40px VT323";
    this.ctx.fillStyle = "white";
    this.ctx.fillText(
        this.name,
        this.faced === 'right' ? this.shotX + 90 : this.shotX - 80,
        this.shotY + 30);

}

Fighter.prototype.draw = function() {
    if(!this.hasDied) {
        this.drawCount++;
    }
    
    this.ctx.drawImage(
        this.img,
        this.img.frameIndex * this.width,
        this.img.rowIndex, 
        this.width,
        this.height,
        this.x, 
        this.y, 
        this.width, 
        this.height
    );

    if (this.drawCount % this.img.animateEvery === 0 && !(this.hasDied)){
       this.animate();
        this.drawCount = 0;
    }

    this.healthbar.draw();
    this.drawShot();
    this.drawPlayerName();

    this.projectile.forEach(function(projectile) {
        projectile.draw();
        projectile.move();
    })

    console.log(this.width);
}

// CKECKERS:
Fighter.prototype.checkIfFaced = function(rival) {
    var myPos = this.x + this.width;
    var rivPos = rival.x + rival.width;

    myPos > rivPos ? this.faced = 'left' : this.faced = 'right';
}
Fighter.prototype.isJumping = function(){
    return this.y < this.y0;
}

Fighter.prototype.isDead = function() {
    return this.health <= 0;
}

// BASIC MOVEMENTS: 
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

    if(!this.isJumping()){   
        this.vy = 0; 
        this.y = this.y0;
        this.state = 'stand'
        this.stand()
    }

}


Fighter.prototype.move = function(){
    if(this.x <= 0) return;

    this.x -= this.vx;
    //TODO: this.faced = 'left' ? this.x -= this.vx : this.x += this.vx;
    this.attack = false;
    this.img.rowIndex = 165; 
    this.width = 145;
    this.height = 180; 
    this.img.frames = 6;
    this.img.animateEvery = 30;

   
}

Fighter.prototype.goBack = function() {
    if(this.x + this.width >= this.ctx.canvas.width ) return

    this.x += this.vx;
    //TODO: this.faced = 'left' ? this.x += this.vx : this.x -= this.vx;

    this.attack = false;
    this.defend = true;

    this.img.rowIndex = 345; 
    this.width = 145; 
    this.height = 205; 
    this.img.frames = 6;
    this.img.animateEvery = 15;
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

Fighter.prototype.receiveDamage = function(rival) {
    var rx = (rival.x <= this.x + this.width) && (this.x <= rival.x + rival.width);

    var ry = this.y + this.height >= rival.y;

    if(this.isDead()) {
        this.state = 'dead';
        rival.state = 'win';
    }

    if(rx && ry){
        this.updateDamage();
    }

}

Fighter.prototype.updateDamage = function(){

    if(this.isDead()) {
        this.state = 'dead';
    } else {
        if(this.defend === true){
            this.damageSound.play();
        } else {
            this.health--;
            this.healthbar.width -= 5; 
            this.displace();
        }
    }
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

// SPECIAL ATTACKS: 
Fighter.prototype.highKick = function(){

    this.state = 'high-kick';
    this.attack = true;
    this.defend = false;

    this.img.rowIndex = 1475;
    this.width = 156; 
    this.height = 195; 
    this.img.frames = 5;
    this.img.animateEvery = 8;
    this.y = 380;

    if(this.img.frameIndex >= this.img.frames) {
        this.img.frameIndex = 0;
        this.state = 'stand';
    }
}

Fighter.prototype.specialAttack = function(){

    this.state = 'special-attack';
    this.attack = true;
    this.defend = false;

    this.img.rowIndex = 2100;
    this.width = 210; 
    this.height = 185; 
    this.img.frames = 5;
    this.img.animateEvery = 12;
    this.y = 380;

    if(this.img.frameIndex >= this.img.frames) {
        this.img.frameIndex = 0;
        this.launchAttack();
        this.state = 'stand';
    }
    
}

Fighter.prototype.launchAttack = function(){
    if(this.projectile.length < 1) {
        this.projectile.push(new Projectile(this.ctx, this.x, this.y + 90, this.width, this));
    }
    else {
        this.projectile.pop();
        this.projectile.push(new Projectile(this.ctx, this.x, this.y + 90, this.width, this));
    }
}


// GAME OVER STATES:
Fighter.prototype.dies = function(){
    
    this.img.rowIndex = 1910;
    this.width = 240; 
    this.height = 190; 
    this.img.frames = 4;
    this.img.animateEvery = 15;
    this.y = this.y0;

    if(this.img.frameIndex >= this.img.frames) {
        this.img.frameIndex = 3;
    }

}

Fighter.prototype.win = function() {
    
    this.img.rowIndex = 1670;
    this.width = 135; 
    this.height = 240; 
    this.img.frames = 7;
    this.img.animateEvery = 8;
    this.y = 360;

    if(this.img.frameIndex >= this.img.frames) {
        this.img.frameIndex = 0; 
    }

    this.paintWinnerName();    

}

Fighter.prototype.paintWinnerName = function(){
    this.ctx.font = "120px VT323";
    this.ctx.fillStyle = "white";
    this.ctx.fillText(this.name + ' wins!',this.ctx.canvas.width * 0.35,this.ctx.canvas.height / 2);
}