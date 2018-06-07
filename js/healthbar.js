function HealthBar(ctx, health ,x){
    this.ctx = ctx;

    this.width = health * 2;
    this.height = 35;

    this.mainColor = '#FF0000';
    this.secondaryColor = '#008000';

    this.x = x; 
    this.y = 10;
}

HealthBar.prototype.draw = function() {
     
    this.ctx.beginPath();
    this.ctx.rect(this.x, this.y, 200, this.height);
    this.ctx.fillStyle = this.mainColor;
    this.ctx.fill();
    this.ctx.globalCompositeOperation='source-over';
    this.ctx.closePath();

    this.ctx.beginPath();
    this.ctx.rect(this.x, this.y, this.width, this.height);
    this.ctx.fillStyle = this.secondaryColor;
    this.ctx.fill();
    this.ctx.globalCompositeOperation = 'source-over';
    this.ctx.closePath();

    console.log(this.width);
}

