function Goku() {
    //this.img.src = "img/fighters/goku-fw.png";
}

Goku.prototype = Object.create(Fighter.prototype); //
Goku.prototype.constructor = Goku; 