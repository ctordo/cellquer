import { Board } from './board'
import { Piece } from './pieces'
import { GameState } from './gamestate';
import type { Move } from './types';


const CELL_SIZE = 60;
const ROWS = 10;
const COLS = 8;

const PWHITE = "#0066ff";
const PBLACK = "#ff0000";
const PWHITE_tr = "#0066ff72";
const PBLACK_tr = "#ff000072";

export class Renderer {
    
    private ctx: CanvasRenderingContext2D;

    constructor(canvas: HTMLCanvasElement){
        this.ctx = canvas.getContext('2d')!;
        canvas.width = COLS * CELL_SIZE;
        canvas.height = ROWS * CELL_SIZE;
    }

    draw(gameState: GameState, selected_piece: Piece | null, legal_moves: Move[]):void {
        this.drawBoard(selected_piece, legal_moves);
        this.drawPieces(gameState.board);
        this.drawFrontierLines(gameState)
    }


    private drawBoard(selected_piece: Piece | null, legal_moves: Move[]): void {
        for (let row = 0; row < ROWS; row++){
            for (let col = 0; col < COLS; col++){

                let parity = (row + col)%2 === 0;
                let selection = (selected_piece && selected_piece.row === row && selected_piece.col === col);
                let color = '#ffffff';
                if (parity) color = !selection ? '#e8e8e8' : '#fcffa6';
                else        color = !selection ? '#b9b9b9' : '#e7ea9a';

                this.ctx.fillStyle = color;
                this.ctx.fillRect(col * CELL_SIZE, row * CELL_SIZE, CELL_SIZE, CELL_SIZE);
            }
        }

        for (const move of legal_moves){
            const cx = move.dest.col * CELL_SIZE + CELL_SIZE/2;
            const cy = move.dest.row * CELL_SIZE + CELL_SIZE/2;
            this.ctx.beginPath();
            this.ctx.arc(cx, cy, CELL_SIZE * 0.2, 0, Math.PI * 2);
            this.ctx.fillStyle = move.color === 'white' ? PWHITE_tr : PBLACK_tr
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
                    piece.draw(this.ctx, cx, cy, CELL_SIZE, piece.color === 'white' ? PWHITE : PBLACK);
                }
            }
        }
    }

    private drawFrontierLines(gameState: GameState): void {
        const whiteFrontier = gameState.getFrontierRow('white');
        const blackFrontier = gameState.getFrontierRow('black');
        this.drawDashedLine(whiteFrontier, PWHITE, 0);
        this.drawDashedLine(blackFrontier + 1, PBLACK, 6);
    }

    private drawDashedLine(row: number, color: string, offset: number): void {
        const y = row * CELL_SIZE;
        this.ctx.beginPath();
        this.ctx.setLineDash([6, 6]);
        this.ctx.lineDashOffset = offset;
        this.ctx.strokeStyle = color;
        this.ctx.lineWidth = 2;
        this.ctx.moveTo(0, y);
        this.ctx.lineTo(this.ctx.canvas.width, y);
        this.ctx.stroke();
        this.ctx.setLineDash([]);
        this.ctx.lineDashOffset = 0;
    }


}