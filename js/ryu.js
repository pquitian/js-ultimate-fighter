function Ryu(ctx, imagesource) {
    Fighter.call(this, ctx, imagesource);
    this.img.src = imagesource;

    this.faced = 'right';
}

Ryu.prototype = Object.create(Fighter.prototype); 
Ryu.prototype.constructor = Ryu; 

Ryu.prototype.TOP = 87;
Ryu.prototype.DOWN = 83;
Ryu.prototype.LEFT = 65;
Ryu.prototype.RIGHT = 68;
Ryu.prototype.PUNCH = 49;
Ryu.prototype.KICK = 50;
