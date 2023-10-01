import { Component, OnInit, HostListener } from '@angular/core';
import { SUPPORTED_KEYS } from '../../constants/supported-keys';
import { PlayService } from '../../service/play.service';
import { Element } from '../../model/element.model';
import { Direction } from '../../constants/direction';

/**
 * A component class responsible to create the game board on the page
 */
@Component({
  selector: 'app-canvas',
  templateUrl: './canvas.component.html',
  styleUrls: ['./canvas.component.css']
})
export class CanvasComponent implements OnInit {

  direction = Direction;
  elements: Element[];
  isGameOver: boolean = false;
  score: number = -1;
  gameCompleted: boolean = false;

  constructor(private playService: PlayService) {
    this.elements = [];
  }

  ngOnInit(): void {
    this.elements = this.playService.elements;
    this.isGameOver = this.gameCompleted = false;
    this.playService.fillRandomValuesInElements();
    this.elements.map(element => element.success.subscribe(this.onSuccess));
  }

  /**
   * Handles keyboard and swipe events and performs the move on the canvas.
   * This fills random values in the empty elements.
   *
   * @param event The keyboard event.
   */
  @HostListener('window:keyup', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) {
    const direction = SUPPORTED_KEYS[event.key];
    this.playGame(direction);
  }

  /**
   * Handles the swipe event on the elements in the canvas.
   *
   * @param event The swipe event
   * @param direction The direction of the swipe
   */
  handleSwipeEvent(event: any, direction: Direction) {
    this.playGame(direction);
  }

  /**
   * When an element emits success, this handler will be called to update the status.
   */
  onSuccess = () => {
    this.gameCompleted = true;
    this.isGameOver = true;
  }

  private playGame(direction: Direction) {
    let moveSuccessful = false;
    if (this.isGameOver || direction === undefined) return;
    this.playService.move(direction)
      .subscribe((mergeScore: number) => {
        moveSuccessful = moveSuccessful || this.score < mergeScore;
      },
        console.error,
        () => {
          if (!this.isGameOver) {
            if (moveSuccessful) {
              this.playService.fillRandomValuesInElements(1);
            }
            this.score = this.playService.score;
            this.isGameOver = this.playService.isGameOver;
          }
        });
  }
}
