import "./styles.css";
import { MineLayout, ClientGameState, Game } from "./mines.js";
const gameCanvas = document.getElementById('gamecanvas');
const ctx = gameCanvas.getContext('2d');

var width = 800; // gamewindow.clientWidth;
var height = 600; // gamewindow.clientHeight;

gameCanvas.setAttribute("width", width);
gameCanvas.setAttribute("height", height);
ctx.fillStyle = 'green';
ctx.height = height;
ctx.width = width;
// ctx.fillRect(0,0,width,height);




var gameState = new ClientGameState("placeholderid");
gameState.setMineLayout(new MineLayout(10, 10));
gameState.mineLayout.addMine(2,3);
gameState.mineLayout.computeAdjacencies();
gameState.playerKnowledgeGrid[4*10 + 4] = 0;
gameState.playerKnowledgeGrid[4*10 + 5] = 1;
gameState.playerKnowledgeGrid[4*10 + 6] = 2;
gameState.playerKnowledgeGrid[4*10 + 7] = 3;
gameState.playerKnowledgeGrid[5*10 + 4] = 4;
gameState.playerKnowledgeGrid[5*10 + 5] = 5;
gameState.playerKnowledgeGrid[5*10 + 6] = 6;
gameState.playerKnowledgeGrid[5*10 + 7] = 7;
gameState.playerKnowledgeGrid[5*10 + 8] = 8;
gameState.drawState(ctx);

var game = new Game();
game.setGameState(gameState);
game.setContext(ctx);


function getCursorPosition(canvas, event) {
  const rect = gameCanvas.getBoundingClientRect()
  const x = event.clientX - rect.left
  const y = event.clientY - rect.top
  return [x,y];
}

gameCanvas.addEventListener('contextmenu', function(e) {
  var coords = getCursorPosition(gameCanvas, e);
  e.preventDefault();
  game.rightClickHandler(coords);
})
