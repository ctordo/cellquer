import { Piece, Pawn } from './pieces';

const INITIAL_STATE = 'pppppppp/pppppppp/......../......../......../......../......../......../PPPPPPPP/PPPPPPPP';

export class Board {
    readonly rows = 10;
    readonly cols = 8;
    grid: (Piece | null)[][];

    constructor(){
        this.grid = this.parse(INITIAL_STATE);
    }

    private parse(state:string): (Piece | null)[][] {

        const grid: (Piece | null)[][] = [];
        const rows = state.split('/');
        for (let r = 0; r < this.rows; r++){
            const row: (Piece | null)[] = [];
            for (let c = 0; c < this.cols; c++){
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