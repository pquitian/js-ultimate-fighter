function Ryu(ctx, imagesource, projectile) {
    Fighter.call(this, ctx, projectile);
    this.img.src = imagesource;
    this.name = 'Ryu';

    this.fighterShot.src = 'img/fighters/ryu_shot.png';
    this.shotX = 10;

    this.x = 200;
    this.healthbar.x = 10;
    
    this.faced = 'right';

    this.ryuPunch = new Audio('sounds/ryu/punch.wav');
    this.ryuKick = new Audio('sounds/ryu/kick.wav');
    this.ryuJump = new Audio('sounds/ryu/jump.wav');
    this.ryuHadouken = new Audio('sounds/ryu/hadouken_2.wav');
    this.ryuHighKick = new Audio('sounds/ryu/highkick.wav');
}

Ryu.prototype = Object.create(Fighter.prototype); 
Ryu.prototype.constructor = Ryu; 

