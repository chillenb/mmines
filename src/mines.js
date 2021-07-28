export class ClientGameState{
  constructor(sessID) {
    this.sessID = sessID;
  }

  setMineLayout(mineLayout) {
    this.mineLayout = mineLayout;
    this.width = mineLayout.width;
    this.height = mineLayout.height;
    this.initPlayerKnowledgeGrid();
  }
  initPlayerKnowledgeGrid() {
    this.playerKnowledgeGrid = new Array(this.width * this.height);
    for(let i = 0; i < this.width*this.height; i++) {
      this.playerKnowledgeGrid[i] = 64; // initialize to all 64; completely unknown grid
    }
  }
  drawState(ctx) {
    ctx.fillStyle = '#858585';
    ctx.fillRect(0, 0, this.width*25, this.height*25);
    for(let i = 0; i < this.height; i++) {
      for(let j = 0; j < this.width; j++) {
        let tileState = this.playerKnowledgeGrid[this.height*i + j];
        if(tileState == 64) {
          ctx.fillStyle = '#D9D9D9';
          ctx.fillRect(25 * j + 1, 25 * i + 1, 23, 23);
        }
        if(tileState <= 8 && tileState >= 0) {
          ctx.fillStyle = '#A8A8A8';
          ctx.fillRect(25 * j + 1, 25 * i + 1, 23, 23);
          if(tileState > 0) {
            ctx.fillStyle = colors[tileState - 1];
            ctx.font = '20px sans';
            ctx.textBaseline = 'middle';
            ctx.fillText(tileState, 25*j + 7, 25*i + 15);
          }
        }

        if(tileState == -1) {
          ctx.fillStyle = '#D9D9D9';
          ctx.fillRect(25 * j + 1, 25 * i + 1, 23, 23);
          ctx.fillStyle = '#FF0000';
          ctx.font = '20px sans';
          ctx.textBaseline = 'middle';
          ctx.fillText('!', 25*j + 7, 25*i + 15);
        }

      }
    }
  }
  flagPos(coords) {
    let j = parseInt(coords[0] / 25);
    let i = parseInt(coords[1] / 25);
    if(i >= this.width || j >= this.height) {
      return;
    }
    if(this.playerKnowledgeGrid[i*this.height + j] == -1) {
      this.playerKnowledgeGrid[i*this.height + j] = 64;
    } else if(this.playerKnowledgeGrid[i * this.height + j] == 64) {
      this.playerKnowledgeGrid[i * this.height + j] = -1;
    }
  }

}

export class Game{
  setGameState(gameState) {
    this.gameState = gameState;
  }
  setContext(ctx) {
    this.ctx = ctx;
  }
  rightClickHandler(coords) {
    this.gameState.flagPos(coords);
    this.gameState.drawState(this.ctx);
  }
}



const colors = ['#0026FF', '#00FFE5', '#CF4100', '#9E0084', '#6C0070', '#20003B', '#000000', '#000000'];

export class MineLayout{
  constructor(width, height) {
    this.width = width;
    this.height = height;
    this.grid = new Array(width*height); // mines are -1; all other values are the number of mines adjacent to the cell (0-8).
    for(let i = 0; i < width*height; i++) {
      this.grid[i] = 0; // initially empty
    }
    this.mineList = new Array(0); // list of mine locations as array of arrays; example: [[0,1], [2,3]]
  }

  addMine(i, j) { // add mine to the ith row, jth column
    try{
      if(i < 0 || i >= this.height || j < 0 || j >= this.width) {
        throw new Error("Invalid mine location");
      }
      if(this.grid[this.width*i + j] == -1) {
        return;
      }
      this.grid[this.width*i + j] = -1;
      this.mineList.push([i,j]);
    } catch(e) {
      console.error(e.name + ": " + e.message);
    }
  }

  isMine(i, j) {
    if(this.grid[i, j] == -1) {
      return true;
    } else {
      return false;
    }
  }

  computeAdjacencies() {
    for(const mine of this.mineList) {
      let i = mine[0];
      let j = mine[1];
      if(i > 0 && j > 0) {
        this.grid[this.width*(i-1) + (j-1)] += 1;
      }
      if(i > 0) {
        this.grid[this.width*(i-1) + j] += 1;
      }
      if(i > 0 && j < this.width - 1) {
        this.grid[this.width*(i-1) + j + 1] += 1;
      }
      if(j > 0) {
        this.grid[this.width*i + (j-1)] += 1;
      }
      if(j < this.width - 1) {
        this.grid[this.width*i+ (j+1)] += 1;
      }
      if(i < this.height - 1 && j < this.width - 1) {
        this.grid[this.width*(i+1) + (j+1)] += 1;
      }
      if(i < this.height - 1) {
        this.grid[this.width*(i+1) + j] += 1;
      }
      if(i < this.height - 1 && j > 0) {
        this.grid[this.width*(i+1) + (j-1)] += 1;
      }
    }
  }


}