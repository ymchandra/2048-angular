import { Direction } from './direction';

/**
 * Constant to specify the supported keys on the keyboard.
 */
export const SUPPORTED_KEYS: { [key: string]: Direction } = {
  'ArrowLeft': Direction.Left,
  'ArrowUp': Direction.Up,
  'ArrowRight': Direction.Right,
  'ArrowDown': Direction.Down
};
