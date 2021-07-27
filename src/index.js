const gamecanvas = document.getElementById('gamecanvas');
const ctx = gamecanvas.getContext('2d');

var width = 800; // gamewindow.clientWidth;
var height = 600; // gamewindow.clientHeight;

gamecanvas.setAttribute("width", width);
gamecanvas.setAttribute("height", height);
ctx.fillStyle = 'green';
ctx.height = height;
ctx.width = width;
ctx.fillRect(0,0,width,height);