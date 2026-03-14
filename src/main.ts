import { GameState } from './gamestate';
import { Renderer } from './renderer';
import type { Piece } from './pieces';
import type { Move } from './types';

const canvas = document.getElementById('game-canvas') as HTMLCanvasElement;
const gameState = new GameState();
const renderer = new Renderer(canvas);

let selectedPiece: Piece | null = null;
let legalMoves: Move[] = [];

function redraw(): void {
  renderer.draw(gameState, selectedPiece, legalMoves);
}

canvas.addEventListener('click', (event: MouseEvent) => {
  const rect = canvas.getBoundingClientRect();
  const col = Math.floor((event.clientX - rect.left) / 60);
  const row = Math.floor((event.clientY - rect.top)  / 60);

  const clicked = gameState.board.grid[row][col];

  if (clicked !== null) {
    if (clicked === selectedPiece) {
      selectedPiece = null;
      legalMoves = [];
    } else {
      selectedPiece = clicked;
      legalMoves = clicked.getLegalMoves(gameState);
    }
  } else {
    selectedPiece = null;
    legalMoves = [];
  }

  redraw();
});

window.addEventListener('DOMContentLoaded', () => {
  redraw();
});