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

    abstract draw(ctx: CanvasRenderingContext2D, cx: number, cy: number, cellSize: number, pcolor:string): void;
}

export class Pawn extends Piece {
    getLegalMoves(gameState: GameState): Move[]{
        const moves: Move[] = [];
        const vertical_direction = this.color == 'white' ? -1 : 1;
        const frontier_row = gameState.getFrontierRow(this.color);
    
        // look for standard march (1 or 2 squares)

        for (let steps=1; steps<=2; steps++){
            const target_row = this.row + steps * vertical_direction;
            const target_col = this.col;

            if (target_row < 0 || target_row > gameState.board.grid.length) break; // cannot go out of boundaries
            if (gameState.board.grid[target_row][target_col] !== null) break; // cannot go on non-empty cell
            if (this.color === 'white' && target_row < frontier_row) break; // cannot go beyond frontier
            if (this.color === 'black' && target_row > frontier_row) break;

            moves.push({
                init: {row:this.row, col:this.col},
                dest: {row:target_row, col:target_col},
                color: this.color
            });
        }

        // look for potential capture
        const jumpRow = this.row + vertical_direction;
        const landRow = this.row + 2 * vertical_direction;

        if (jumpRow >= 0 && jumpRow < gameState.board.rows && landRow >= 0 && landRow < gameState.board.rows){
            
            const occupant = gameState.board.grid[jumpRow][this.col];
            const landing = gameState.board.grid[landRow][this.col];

            const opponent_is_ahead = occupant !== null && occupant.color !== this.color;
            const landing_free = landing === null;
            const in_frontier = !((this.color === 'white' && landRow < frontier_row) || (this.color === 'black' && landRow > frontier_row));
            if (opponent_is_ahead && landing_free && in_frontier){
                moves.push({
                    init: {row:this.row, col:this.col},
                    dest: {row:landRow, col:this.col},
                    color: this.color,
                    captured: {row:jumpRow, col:this.col}
                });
            }




        }

        return moves;
    }

    draw(ctx: CanvasRenderingContext2D, cx: number, cy: number, cellSize: number, pcolor:string): void {
        const size = cellSize * 0.7;

        let w = size;
        let h = size * 2/3;
        if (this.color === 'white') {
            h = -h;
            w = -w;
        }

        ctx.beginPath();
        
        ctx.moveTo(cx - w/2, cy);
        ctx.lineTo(cx - w/2, cy - h/2);
        ctx.lineTo(cx, cy);
        ctx.lineTo(cx + w/2, cy - h/2);
        ctx.lineTo(cx + w/2, cy);
        ctx.lineTo(cx, cy + h/2);
        ctx.lineTo(cx - w/2, cy);

        ctx.closePath();

        ctx.fillStyle = pcolor;
        ctx.fill();
        ctx.strokeStyle = '#000000';
        ctx.lineWidth = 1;
        ctx.stroke();
    }
}