import { GameState } from './gamestate';
import { Renderer } from './renderer';
import type { Piece } from './pieces';
import type { Move } from './types';

const CELL_SIZE = 60;

export class BoardInteractionHandler {

    private gameState: GameState;
    private renderer: Renderer;
    private selectedPiece: Piece | null = null;
    private legalMoves: Move[] = [];
    private turnIndicator: HTMLElement;


    constructor(canvas: HTMLCanvasElement, gameState: GameState, renderer: Renderer){
        this.gameState = gameState;
        this.renderer = renderer;
        
        const indicator = document.getElementById('turn-indicator');
        if (!indicator) throw new Error('Turn indicator element not found');
        this.turnIndicator = indicator;

        canvas.addEventListener('click', (event:MouseEvent) => this.handleClick(event, canvas));
    }

    private handleClick(event:MouseEvent, canvas: HTMLCanvasElement): void {
        const rect = canvas.getBoundingClientRect();
        const col = Math.floor((event.clientX - rect.left) / CELL_SIZE);
        const row = Math.floor((event.clientY - rect.top)  / CELL_SIZE);

        const clickedMove = this.legalMoves.find(
            m => m.dest.row === row && m.dest.col === col
        );

        if (clickedMove !== null && clickedMove !== undefined) {
            this.gameState.movePiece(clickedMove);
            this.selectedPiece = null;
            this.legalMoves = [];
            this.updateTurnIndicator();
            this.redraw();
            return;
        }

        const clicked = this.gameState.board.grid[row][col];

        if (clicked !== null) {
            if (clicked.color !== this.gameState.currentTurn) { // only allow selecting pieces of the current player
                this.selectedPiece = null;
                this.legalMoves = [];
                this.redraw();
                return;
            }
            if (clicked === this.selectedPiece) {
                this.selectedPiece = null;
                this.legalMoves = [];
            } else {
                this.selectedPiece = clicked;
                this.legalMoves = clicked.getLegalMoves(this.gameState);
            }
        }
        else {
            this.selectedPiece = null;
            this.legalMoves = [];
        }
        this.redraw();
    }

    private redraw():void {
        this.renderer.draw(this.gameState, this.selectedPiece, this.legalMoves);
    }

    private updateTurnIndicator(): void {
        this.turnIndicator.textContent = this.gameState.currentTurn === 'white' ? "White's turn" : "Black's turn";
    }
    
    intialDraw(): void {
        this.redraw();
        this.updateTurnIndicator();
    }
}