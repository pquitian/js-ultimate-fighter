function Goku(ctx, imagesource, projectile) {
    Fighter.call(this, ctx, projectile);
    this.img.src = imagesource;
    

    this.faced = 'left';

    

    this.healthbar.x = (this.ctx.canvas.width - this.healthbar.width) -10;
    //this.healthbar.mainColor = '#2dabea';
    //this.healthbar.secondaryColor = '#ea5c2c';
    
    //this.setListeners(); 
    
    //Sound-effects
    this.gokuPunch = new Audio('sounds/goku/punch.wav');
    this.gokuKick = new Audio('sounds/goku/kick.wav');
    this.gokuJump = new Audio('sounds/goku/jump.wav');
    this.gokuHighKick = new Audio('sounds/goku/highkick.wav');
    this.gokuKame = new Audio('sounds/goku/kamehameha.wav');
}

Goku.prototype = Object.create(Fighter.prototype); 
Goku.prototype.constructor = Goku; 

