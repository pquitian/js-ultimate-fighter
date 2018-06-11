function Goku(ctx, imagesource, projectile) {
    Fighter.call(this, ctx, projectile);
    this.img.src = imagesource;
    this.name = 'Goku';

    this.fighterShot.src = 'img/fighters/goku_shot.png';
    this.shotX = (this.ctx.canvas.width) -90, 

    this.faced = 'left';

    this.healthbar.x = (this.ctx.canvas.width - this.healthbar.width) -10;

    //Sound-effects
    this.gokuPunch = new Audio('sounds/goku/punch.wav');
    this.gokuKick = new Audio('sounds/goku/kick.wav');
    this.gokuJump = new Audio('sounds/goku/jump.wav');
    this.gokuHighKick = new Audio('sounds/goku/highkick.wav');
    this.gokuKame = new Audio('sounds/goku/kamehameha.wav');
}

Goku.prototype = Object.create(Fighter.prototype); 
Goku.prototype.constructor = Goku; 

