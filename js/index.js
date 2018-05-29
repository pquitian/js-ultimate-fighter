
window.onload = function() {
    var canvas = document.createElement("canvas");

    canvas.width = 1200;
    canvas.height = 600;

    document.body.prepend(canvas);

    //Preload??

    new Game(canvas).start();
};