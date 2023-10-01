import { Direction } from './direction';
import { Element } from '../model/element.model';

/**
 * Constant that specifies possible moves based on the direction.
 */
export const POSSIBLE_MOVES_MATRIX: { [key: string]: (elements: Element[][]) => Element[][][] } = {
    [Direction.Up]: (rows: Element[][]): Element[][][] => { return [[rows[1], rows[0]], [rows[2], rows[1], rows[0]], [rows[3], rows[2], rows[1], rows[0]]] },
    [Direction.Down]: (rows: Element[][]): Element[][][] => { return [[rows[2], rows[3]], [rows[1], rows[2], rows[3]], [rows[0], rows[1], rows[2], rows[3]]] },
    [Direction.Left]: (columns: Element[][]): Element[][][] => { return [[columns[1], columns[0]], [columns[2], columns[1], columns[0]], [columns[3], columns[2], columns[1], columns[0]]] },
    [Direction.Right]: (columns: Element[][]): Element[][][] => { return [[columns[2], columns[3]], [columns[1], columns[2], columns[3]], [columns[0], columns[1], columns[2], columns[3]]] }
};
