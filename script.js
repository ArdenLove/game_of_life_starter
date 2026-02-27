//python -m http.server
let grid;
let trasGrid;
let cols;
let rows;
let resolution = 15; // Size of each cell
let pause = true

function setup() {
  createCanvas(windowWidth, windowHeight - 50);
  cols = floor(width / resolution);
  rows = floor(height / resolution);

  grid = make2DArray(cols, rows);
  console.log(grid)
}

function draw() {



  background(240); // Light gray background
  for (let i = 0; i < grid.length; i++) {
    for (let j = 0; j < grid[i].length; j++) {
      if (grid[i][j] == 0) {
        fill(255, 255, 255)
        square(j * resolution, i * resolution, resolution)
      }
      if (grid[i][j] == 1) {
        fill(0, 0, 0)
        square(j * resolution, i * resolution, resolution)
      }
    }
  }
if (!pause){
  // 2. Compute next state (if not paused)
  //Underpopulation: Any live cell with fewer than 2 live neighbors dies.
  //Survival: Any live cell with 2 or 3 live neighbors lives on to the next generation.
  //Overpopulation: Any live cell with more than 3 live neighbors dies.
  //Reproduction: Any dead cell with exactly 3 live neighbors becomes a live cell.
  trasGrid = make2DArray(cols,rows);
  for (let i = 0; i < grid.length; i++) {
    for (let j = 0; j < grid[i].length; j++) {
      if (grid[i][j] == 1 && countNeighbors(j, i) < 2) {
        trasGrid[i][j] = 0
      }
      if (grid[i][j] == 1 && countNeighbors(j, i) == 2 || countNeighbors(j, i) == 3) {
        trasGrid[i][j] = 1
      }
      if (grid[i][j] == 1 && countNeighbors(j, i) > 3) {
        trasGrid[i][j] = 0
      }
      if (grid[i][j] == 0 && countNeighbors(j, i) == 3) {
        trasGrid[i][j] = 1
      }
    }

  }
  grid = trasGrid
}
}
// --- INTERACTIVE CONTROLS ---

// 1. Click or Drag to Draw
function mousePressed() {
  
  if (mouseIsPressed&& mouseX>0&& mouseY>0&& mouseX<windowWidth &&mouseY< windowHeight - 50){
    toggleCell();
  }
  
}

function mouseDragged() {
  toggleCell();
}

function toggleCell() {
  console.log(mouseX, mouseY)
  if (grid[Math.floor(mouseY/15)][Math.floor(mouseX/15)]==1){
    grid[Math.floor(mouseY/15)][Math.floor(mouseX/15)]=0
  }else if(grid[Math.floor(mouseY/15)][Math.floor(mouseX/15)]==0){
    grid[Math.floor(mouseY/15)][Math.floor(mouseX/15)]=1
  }
  
}

// 2. Keyboard Controls
function keyPressed() {
  if (key === 'r'){
    randomizeGrid();
  }
 if (key=== 'p'){
  pause = !pause
 }
}

// --- HELPER FUNCTIONS ---

function make2DArray(cols, rows) {
  let arr = new Array(rows);
  for (let i = 0; i < arr.length; i++) {
    arr[i] = new Array(cols).fill(0);
  }
  console.log(arr)
  return arr;
}

function randomizeGrid() {
  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
      grid[i][j] = Math.round(Math.random());
    }
  }
  console.log(grid)
}

function countNeighbors(col, row) {
  let count = 0
  for (let i = row-1; i < row+2; i++) {
    for (let j = col-1; j < col+2; j++) {
      if (i > -1 && j > -1 && i < grid.length && j < grid[i].length) {
        if (grid[i][j] == 1 && (row != i || col != j)) {
          count++
        }
      }
    }
  }
  return count
}
