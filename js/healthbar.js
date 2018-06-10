function HealthBar(ctx, health ,x){
    this.ctx = ctx;

    this.height = 25;

    this.height <= 0;
    this.width = health * 5;

    this.mainColor = '#ea5c2c';
    this.secondaryColor = '#2dabea';

    this.x = x; 
    this.y = 10;
}

HealthBar.prototype.draw = function() {
     
    this.ctx.beginPath();
    this.ctx.rect(this.x, this.y, 500, this.height);
    this.ctx.fillStyle = this.mainColor;
    this.ctx.fill();
    this.ctx.globalCompositeOperation='source-over';
    this.ctx.strokeStyle = 'black';
    this.ctx.stroke();
    this.ctx.lineWidth = 3;
    this.ctx.closePath();

    this.ctx.beginPath();
    this.ctx.rect(
        this.x, 
        this.y, 
        this.width, 
        this.height);
    this.ctx.fillStyle = this.secondaryColor;
    this.ctx.fill();
    this.ctx.globalCompositeOperation = 'source-over';
    this.ctx.closePath();

}

