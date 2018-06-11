
window.onload = function() {
    var initButton = document.getElementById('btn');
    var initScreen = document.getElementById('main');
    initButton.onclick = function() {
        initScreen.style.display = 'none';
        var canvas = document.createElement("canvas");

        canvas.width = 1200;
        canvas.height = 600;

        document.body.prepend(canvas);
        new Game(canvas).start();
    }
    
};