export type Color = 'white' | 'black';

export interface Move {
    init: { row: number; col: number };
    dest: { row: number; col: number };
    color: Color;
    captured?: { row: number; col: number };
}

