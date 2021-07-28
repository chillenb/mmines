import "./styles.css";
import { MineLayout, ClientGameState } from "./mines.js";
const gamecanvas = document.getElementById('gamecanvas');
const ctx = gamecanvas.getContext('2d');

var width = 800; // gamewindow.clientWidth;
var height = 600; // gamewindow.clientHeight;

gamecanvas.setAttribute("width", width);
gamecanvas.setAttribute("height", height);
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