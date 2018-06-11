function Projectile(ctx, x, y, w, fighter){
    this.ctx = ctx;

    this.img = new Image;
    this.img.src = 'img/projectiles/projectile.png';
    this.img.frameIndex = 0;
    this.img.frames = 4;
    this.img.animateEvery = 2;
    fighter.faced === 'left' ? this.rowIndex = 50 : this.rowIndex = 0;

    this.drawCount = 0;

    this.width = 86;
    this.height = 50;

    fighter.faced === 'left' ? this.x = x : this.x = x + w;
    this.y = y;

    this.vx = 3;

    if (fighter.faced !== "right")
        this.vx *= -1;

    this.fighter = fighter;
}

Projectile.prototype.draw = function(){
    this.drawCount++;
    //this.drawCount++; 
    
    this.ctx.drawImage(
        this.img,
        this.img.frameIndex * this.width,
        this.rowIndex,
        this.width,
        this.height,
        this.x,
        this.y,
        this.width,
        this.height
    );

}

Projectile.prototype.move = function(){
    this.x += this.vx;
    this.animate();
    console.log(this.img.frameIndex, this.drawCount)
}

Projectile.prototype.animate = function() {
    if(this.drawCount % this.img.animateEvery === 0) {
        this.img.frameIndex++;

        if(this.img.frameIndex >= this.img.frames) {
            this.img.frameIndex = 0;
        }
    }
}

Projectile.prototype.isOutside = function(){
    return this.x + this.width < 0 || this.x > this.ctx.canvas.width;
}


