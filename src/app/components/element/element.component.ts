import { Component, OnInit, Input } from '@angular/core';
import { Element } from '../../model/element.model';

/**
 * A compoment class which creates an element in the canvas.
 * Each cell in the canvas is an element.
 */
@Component({
  selector: 'app-element',
  templateUrl: './element.component.html',
  styleUrls: ['./element.component.css']
})
export class ElementComponent implements OnInit {
  @Input() element: Element;
  constructor() { }

  ngOnInit(): void {
  }

  /**
   * Gets the css style dynamically for the elements in the canvas based on the value.
   */
  get class(): string {
    const css = `color-${this.element.value}`;
    if (this.element.value === null) return 'empty';
    if (this.element.hasMerged) return `${css} merged`;
    return css;
  }
}
