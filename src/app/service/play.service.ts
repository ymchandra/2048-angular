import { Injectable } from '@angular/core';
import { Element } from '../model/element.model';
import { Direction } from '../constants/direction';
import { MoveService } from './move.service';

import { Observable } from 'rxjs';
import { times } from 'lodash';

const randomNumber = (min: number, max: number) => Math.floor(Math.random() * (max - min + 1)) + min;
const areHavingSameValues = (element1: Element, element2: Element) => element1.value === element2.value;

/**
 * The service class responsible for the game play.
 */
@Injectable({
  providedIn: 'root'
})
export class PlayService {

  elements: Element[] = Array(16).fill(null).map(_ => new Element());
  rows: Element[][] = [];
  columns: Element[][] = [];
  score: number = 0;

  constructor(private moveService: MoveService) {
    this.initColumns();
    this.rows = this.columns[0].map((col, i) => this.columns.map(row => row[i]));
  }

  /**
   * Returns true if there are no moves and no empty elements, false otherwise
   */
  get isGameOver(): boolean {
    return !this.hasMoves() && this.getEmptyElements().length === 0;
  }

  /**
   * Moves the element to the specified direction if possible.
   * @param direction The direction at which the element has to move.
   */
  public move(direction: Direction): Observable<any> {
    const elements = direction === Direction.Left || direction === Direction.Right ? this.columns : this.rows;
    return this.moveService
      .performMove(direction, elements)
      .map((mergeScore: number) => {
        this.score += mergeScore;
        return this.score
      });
  }

  /**
   * Fills the empty elements with random values of either 2 or 4
   * @param numberOfFills The number of times the values should be filled in. Defaults to 2
   */
  public fillRandomValuesInElements(numberOfFills: number = 2) {
    times(numberOfFills, this.fillRandomValues.bind(this));
  }

  private fillRandomValues() {
    const emptyElement: Element[] = this.getEmptyElements();
    if (emptyElement.length > 0) {
      const randomIndex = randomNumber(0, emptyElement.length - 1);
      const randomValue = randomNumber(1, 2) === 1 ? 2 : 4;
      emptyElement[randomIndex].value = randomValue;
    }
  }

  private initColumns() {
    times(4, (i) => {
      let row: Element[] = [];
      for (let j = 0; j < 16; j = j + 4) {
        row.push(this.elements[i + j]);
      }
      this.columns.push(row);
    });
  }

  private hasMoves() {
    const hasColumnMoves = this.hasPossibleMoves(this.columns);
    if (hasColumnMoves) return true;

    const hasRowMoves = this.hasPossibleMoves(this.rows);
    return hasRowMoves;
  }

  private getEmptyElements(): Element[] {
    return this.elements.reduce((emptyElements: Element[], element) => {
      if (element.isEmpty) {
        emptyElements.push(element);
      }
      return emptyElements;
    }, []);
  }

  private hasPossibleMoves(elements: Element[][]): boolean {
    for (let i = 0; i < 4; i++) {
      const element = elements[i];
      for (let j = 0; j < 3; j++) {
        if (areHavingSameValues(element[j], element[j + 1])) {
          return true;
        }
      }
    }
    return false;
  }
}
