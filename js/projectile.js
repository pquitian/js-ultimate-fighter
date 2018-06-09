function Projectile(ctx, x, y){
    this.ctx = ctx;

    this.img = new Image;
    this.img.src = 'img/projectiles/projectile.png';
    this.img.frameIndex = 0;
    this.img.frames = 4;
    this.img.animateEvery = 50;
    this.rowIndex = 50;

    this.drawCount = 0;

    this.width = 85;
    this.height = 50;

    this.x = x;
    this.y = y;

    this.vx = 3;
}

Projectile.prototype.draw = function(){
    this.drawCount++;
    //this.drawCount++; 
    
    this.ctx.drawImage(
        this.img,
        this.img.frameIndex * (this.width / this.img.frames) - 25,
        this.rowIndex,
        this.width,
        this.height,
        this.x,
        this.y,
        this.width,
        this.height
    );

    // this.ctx.drawImage(
    //     this.img,
    //     this.x, 
    //     this.y,
    //     this.width,
    //     this.height
    // );
}

Projectile.prototype.move = function(){
    this.x -= this.vx;
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

