function Ryu(ctx, imagesource, projectile) {
    Fighter.call(this, ctx, projectile);
    this.img.src = imagesource;

    this.x = 200;
    this.healthbar.x = 10;
    
    this.faced = 'right';

    //this.setListeners();
    //this.punchSound = new Audio('sounds/goku/punch.wav');
    this.ryuPunch = new Audio('sounds/ryu/punch.wav');
    this.ryuKick = new Audio('sounds/ryu/kick.wav');
    this.ryuJump = new Audio('sounds/ryu/jump.wav');
    this.ryuHadouken = new Audio('sounds/ryu/hadouken.wav');



}

Ryu.prototype = Object.create(Fighter.prototype); 
Ryu.prototype.constructor = Ryu; 

