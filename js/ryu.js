function Ryu(ctx, imagesource) {
    Fighter.call(this, ctx, imagesource);
    this.img.src = imagesource;

    this.x = 200;

    this.faced = 'right';
    //this.punchSound = new Audio('sounds/goku/punch.wav');
}

Ryu.prototype = Object.create(Fighter.prototype); 
Ryu.prototype.constructor = Ryu; 

Ryu.prototype.TOP = 87;
Ryu.prototype.DOWN = 83;
Ryu.prototype.LEFT = 65;
Ryu.prototype.RIGHT = 68;
Ryu.prototype.PUNCH = 49;
Ryu.prototype.KICK = 50;

