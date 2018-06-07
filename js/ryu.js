function Ryu(ctx, imagesource) {
    Fighter.call(this, ctx, imagesource);
    this.img.src = imagesource;

    this.x = 200;
    this.healthbar.x = 10;
    
    this.faced = 'right';

    //this.setListeners();
    //this.punchSound = new Audio('sounds/goku/punch.wav');
}

Ryu.prototype = Object.create(Fighter.prototype); 
Ryu.prototype.constructor = Ryu; 

