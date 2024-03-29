import { Injectable } from '@angular/core';
import { Direction } from '../constants/direction';
import { Element } from '../model/element.model';
import { POSSIBLE_MOVES_MATRIX } from '../constants/possible.moves.matrix';
import {mergeMap, map, pairwise, delay} from 'rxjs/operators';
import { Observable, from, of } from 'rxjs';

/**
 * The service class responsible to perform moves of elements on the canvas
 */
@Injectable({
  providedIn: 'root'
})
export class MoveService {

  constructor() { }

  /**
  * Performs a move based on the specified direction and merges the same values together
  */
  public performMove(direction: Direction, elements: Element[][]): Observable<any> {
    this.resetMerge(elements);
    const possibleMoves = POSSIBLE_MOVES_MATRIX[direction](elements);
    return this.mergeElements(possibleMoves);
  }

  private resetMerge(values: Element[][]) {
    values.forEach(elements => elements.forEach(element => element.resetHasMerged()));
  }

  private mergeElements(possibleMoves: Element[][][]): Observable<any> {
    return from(possibleMoves)
      .pipe(mergeMap(possibleMove => {
        let delayTime = 0;
        return from(possibleMove).pipe(pairwise()).pipe(mergeMap(pair => {
          delayTime += 50;
          return of(pair).pipe(delay(delayTime));
        }));
      }))
      .pipe(map(([op1, op2]) => this.calculateMergeValue(op2, op1)));
  }

  private calculateMergeValue(first: Element[], second: Element[]): number {
    let mergeValue = 0;
    for (let i = 0; i < first.length; i++) {
      if (first[i].merge(second[i])) {
        mergeValue += first[i].value;
      }
    }
    return mergeValue;
  }
}
