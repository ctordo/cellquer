import type { Move, Color } from './types'
import { GameState } from './gamestate'

export abstract class Piece {
    readonly color: Color;
    row: number;
    col: number;

    constructor(color:Color, row:number, col:number){
        this.color = color;
        this.row = row;
        this.col = col;

    }

    abstract getLegalMoves(gameState: GameState): Move[];

    abstract draw(ctx: CanvasRenderingContext2D, cx: number, cy: number, cellSize: number): void;
}

export class Pawn extends Piece {
    getLegalMoves(gameState: GameState): Move[]{
        const moves: Move[] = [];
        const vertical_direction = this.color == 'white' ? -1 : 1;
        const frontier_row = gameState.getFrontierRow(this.color);
    
        for (let steps=1; steps<=2; steps++){
            const target_row = this.row + steps * vertical_direction;
            const target_col = this.col;

            // cannot go out of boundaries
            if (target_row < 0 || target_row > gameState.board.grid.length) break;
            // cannot go on non-empty cell
            if (gameState.board.grid[target_row][target_col] !== null) break;
            // cannot go beyond frontier
            if (this.color === 'white' && target_row < frontier_row) break;
            if (this.color === 'black' && target_row > frontier_row) break;

            moves.push({
                init: {row:this.row, col:this.col},
                dest: {row:target_row, col:target_col},
            });
        }
        return moves;
    }

    draw(ctx: CanvasRenderingContext2D, cx: number, cy: number, cellSize: number): void {
      const size = cellSize * 0.35;

      ctx.beginPath();
      if (this.color === 'white') {
        ctx.moveTo(cx, cy - size);
        ctx.lineTo(cx + size, cy + size);
        ctx.lineTo(cx - size, cy + size);
      } else {
        ctx.moveTo(cx, cy + size);
        ctx.lineTo(cx + size, cy - size);
        ctx.lineTo(cx - size, cy - size);
      }
      ctx.closePath();

      ctx.fillStyle = this.color === 'white' ? '#ebebeb' : '#5f5f5f';
      ctx.fill();

      ctx.strokeStyle = '#000000';
      ctx.lineWidth = 1;
      ctx.stroke();
    }


}