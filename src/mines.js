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
      this.playerKnowledgeGrid[i] = 0; // initialize to all zeroes; empty grid
    }
  }
  drawState(ctx) {
    ctx.fillStyle = '#858585';
    ctx.fillRect(0, 0, this.width*25, this.height*25);
    for(let i = 0; i < this.height; i++) {
      for(let j = 0; j < this.width; j++) {
        if(this.playerKnowledgeGrid[this.height*i + j] == 0) {
          ctx.fillStyle = '#D9D9D9';
          ctx.fillRect(25 * i + 1, 25 * j + 1, 23, 23);
        }
      }
    }
  }

}

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