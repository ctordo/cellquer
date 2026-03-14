import { Board } from './board';
import { Renderer } from './renderer';
import { Piece } from './pieces';
import type { Move } from './pieces';

const canvas = document.getElementById('game-canvas') as HTMLCanvasElement;
const board = new Board();
const renderer = new Renderer(canvas);

let selectedPiece: Piece | null = null;
let legalMoves: Move[] = [];

function redraw(): void {
  renderer.draw(board, selectedPiece, legalMoves);
}

canvas.addEventListener('click', (event: MouseEvent) => {
  const rect = canvas.getBoundingClientRect();
  const col = Math.floor((event.clientX - rect.left) / 60);
  const row = Math.floor((event.clientY - rect.top)  / 60);

  const clicked = board.grid[row][col];

  if (clicked !== null) {
    if (clicked === selectedPiece){
      selectedPiece = null;
      legalMoves = [];
    }
    else{
      // clicked on a piece — select it
      selectedPiece = clicked;
      legalMoves = clicked.getLegalMoves(board.grid);
    }
  } else {
    // clicked on empty square — deselect
    selectedPiece = null;
    legalMoves = [];
  }

  redraw();
});

window.addEventListener('DOMContentLoaded', () => {
  redraw();
});