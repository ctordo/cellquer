import { Board } from './board.ts'
import { Piece } from './pieces.ts'
import type { Move } from './pieces.ts'

const CELL_SIZE = 60;
const ROWS = 10;
const COLS = 8;

export class Renderer {
    
    private ctx: CanvasRenderingContext2D;

    constructor(canvas: HTMLCanvasElement){
        this.ctx = canvas.getContext('2d')!;
        canvas.width = COLS * CELL_SIZE;
        canvas.height = ROWS * CELL_SIZE;
    }

    draw(board:Board, selected_piece: Piece | null, legal_moves: Move[]):void {
        this.drawBoard(selected_piece, legal_moves);
        this.drawPieces(board);
    }


    private drawBoard(selected_piece: Piece | null, legal_moves: Move[]): void {
        for (let row = 0; row < ROWS; row++){
            for (let col = 0; col < COLS; col++){

                let parity = (row + col)%2 === 0;
                let selection = (selected_piece && selected_piece.row === row && selected_piece.col === col);
                let color = '#ffffff';
                if (parity) color = !selection ? '#ffeded' : '#fcffa6';
                else        color = !selection ? '#e1bcbc' : '#e7ea9a';

                this.ctx.fillStyle = color;
                this.ctx.fillRect(col * CELL_SIZE, row * CELL_SIZE, CELL_SIZE, CELL_SIZE);
            }
        }

        for (const move of legal_moves){
            const cx = move.dest.col * CELL_SIZE + CELL_SIZE/2;
            const cy = move.dest.row * CELL_SIZE + CELL_SIZE/2;
            this.ctx.beginPath();
            this.ctx.arc(cx, cy, CELL_SIZE * 0.2, 0, Math.PI * 2);
            this.ctx.fillStyle = 'rgba(0, 0, 0, 0.25)';
            this.ctx.fill();
        }
    }
    
    private drawPieces(board:Board): void {
        for (let row = 0; row < ROWS; row++){
            for (let col = 0; col < COLS; col++){
                const piece = board.grid[row][col];
                if (piece !== null){
                    const cx = col * CELL_SIZE + CELL_SIZE/2;
                    const cy = row * CELL_SIZE + CELL_SIZE/2;
                    piece.draw(this.ctx, cx, cy, CELL_SIZE)
                }
            }
        }
    }


}