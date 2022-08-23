import { render, screen } from '@testing-library/react';
import BackgroundSound from '.';
import { SOUND, ALT } from './constants';

describe('rendering', () => {
  let sounds: HTMLElement[];

  beforeEach(() => {
    render(<BackgroundSound />);
    sounds = screen.getAllByLabelText(ALT);
  });

  test('render with id', () => {
    Object.entries(SOUND).forEach(([type, source], index) => {
      expect(sounds[index]).toHaveProperty('id', `${type}-sound`);
    });
  });

  test('render with src', () => {
    Object.entries(SOUND).forEach(([type, source], index) => {
      expect(sounds[index]).toHaveProperty(
        'src',
        expect.stringContaining(source)
      );
    });
  });
});
