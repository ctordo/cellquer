import { Board } from './board';
import type { Color } from './types';

export class GameState {
  board: Board;
  currentTurn: Color;

  constructor() {
    this.board = new Board();
    this.currentTurn = 'white';
  }

  getFrontierRow(color: Color): number {
    let furthestRow = color === 'white' ? this.board.rows - 1 : 0;

    for (let row = 0; row < this.board.rows; row++) {
      for (let col = 0; col < this.board.cols; col++) {
        const piece = this.board.grid[row][col];
        if (piece !== null && piece.color === color) {
          if (color === 'white' && row < furthestRow) furthestRow = row;
          if (color === 'black' && row > furthestRow) furthestRow = row;
        }
      }
    }

    return color === 'white' ? furthestRow - 1 : furthestRow + 1;
  }
}