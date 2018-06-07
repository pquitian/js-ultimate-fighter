function Goku(ctx, imagesource) {
    Fighter.call(this, ctx, imagesource);
    this.img.src = imagesource;
    

    this.faced = 'left';

    this.healthbar.x = (this.ctx.canvas.width - this.healthbar.width) -10;

    //this.setListeners();    
}

Goku.prototype = Object.create(Fighter.prototype); 
Goku.prototype.constructor = Goku; 




