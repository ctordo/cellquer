export interface Move {
  init: { row: number; col: number };
  dest: { row: number; col: number };
}

export type Color = 'white' | 'black';