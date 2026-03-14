import {Piece, Pawn} from './pieces.ts';


const ROWS = 10;
const COLS = 8;

const INITIAL_STATE = '......../pppppppp/......../......../......../......../......../......../PPPPPPPP/........';

export class Board {
    grid: (Piece | null)[][];

    constructor(){
        this.grid = this.parse(INITIAL_STATE);
    }

    private parse(state:string): (Piece | null)[][] {

        const grid: (Piece | null)[][] = [];
        const rows = state.split('/');
        for (let r = 0; r < ROWS; r++){
            const row: (Piece | null)[] = [];
            for (let c = 0; c < COLS; c++){
                const char = rows[r][c];
                if (char === 'P') row.push(new Pawn('white', r, c));
                else if (char === 'p') row.push(new Pawn('black', r, c));
                else row.push(null);
            }
            grid.push(row);
        }
        return grid;
    }
}