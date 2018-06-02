function Goku(ctx, imagesource) {
    Fighter.call(this, ctx, imagesource);
    this.img.src = imagesource;
    

    this.faced = 'left';
}

Goku.prototype = Object.create(Fighter.prototype); 
Goku.prototype.constructor = Goku; 

Goku.prototype.TOP = 38;
Goku.prototype.DOWN = 40;
Goku.prototype.LEFT = 37;
Goku.prototype.RIGHT = 39;
Goku.prototype.PUNCH = 77;
Goku.prototype.KICK = 78;
