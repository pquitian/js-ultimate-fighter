function Landscape(ctx){
    this.ctx = ctx;

    this.width = ctx.canvas.width;
    this.height = ctx.canvas.height;

    this.img = new Image();
    this.img.src = "img/tiles/tile_" + Math.round( (Math.random() * 5) + 1) + ".jpg";

    this.x = 0;
    this.y = 0;
}

Landscape.prototype.draw = function(){
    this.ctx.drawImage(
        this.img, 
        this.x, 
        this.y,
        this.width, 
        this.height
    );
};