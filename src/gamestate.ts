import { Board } from './board';
import type { Move, Color } from './types';

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

    movePiece(move: Move): void {
        const piece = this.board.grid[move.init.row][move.init.col];
        if (piece === null) return;
        
        if (move.captured) {
            this.board.grid[move.captured.row][move.captured.col] = null;
        }

        this.board.grid[move.dest.row][move.dest.col] = piece; // place piece on new square
        
        this.board.grid[move.init.row][move.init.col] = null; // vacate old square
        
        piece.row = move.dest.row; // update piece's own position
        piece.col = move.dest.col;
        
        this.currentTurn = this.currentTurn === 'white' ? 'black' : 'white'; // switch turn
    }
}