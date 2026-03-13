const canvas = document.getElementById('game-canvas') as HTMLCanvasElement;
const ctx = canvas.getContext('2d')!;

// Draw a simple 6x12 grid
const COLS = 6;
const ROWS = 12;
const CELL_SIZE = 60;

canvas.width = COLS * CELL_SIZE;
canvas.height = ROWS * CELL_SIZE;

for (let row = 0; row < ROWS; row++) {
  for (let col = 0; col < COLS; col++) {
    ctx.fillStyle = (row + col) % 2 === 0 ? '#f0d9b5' : '#b58863';
    ctx.fillRect(col * CELL_SIZE, row * CELL_SIZE, CELL_SIZE, CELL_SIZE);
  }
}