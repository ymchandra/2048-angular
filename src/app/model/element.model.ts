import { EventEmitter } from '@angular/core';

/**
 * The data holder (DTO) class of an element in the canvas
 */
export class Element {

  hasMerged: boolean = false;
  success: EventEmitter<boolean> = new EventEmitter<boolean>();
  _value: any = null;

  /**
   * Sets the given value to the element.
   * Emits true if the value is 2048
   */
  set value(value: any) {
    if (value === 2048) {
      this.success.emit(true);
    }
    this._value = value;
  }

  /**
   * Returns the current value of the element.
   */
  get value() {
    return this._value;
  }

  /**
   * Returns true if the current value is empty, false otherwise.
   */
  get isEmpty(): boolean {
    return this.value === null;
  };

  /**
   * Merges two element values upon sliding in the canvas.
   * @param element Merges the current to the specified element.
   */
  merge(element: Element): boolean {
    const val = element.value;
    if (!val || this.hasMerged || element.hasMerged || (this.value && this.value !== val)) {
      return false;
    }
    if (this.value) {
      this.value += val;
      this.hasMerged = true;
    } else {
      this.value = val;
    }
    element.value = null;
    return true;
  }

  /**
   * Resets the hasMerged flag of the element to false.
   */
  resetHasMerged() {
    this.hasMerged = false;
  }
};