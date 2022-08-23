import { screen, render } from '@testing-library/react';
import { renderHook } from '@testing-library/react-hooks';
import BackgroundSound from '~/components/common/Layout/BackgroundSound';
import {
  ALT,
  SOUND
} from '~/components/common/Layout/BackgroundSound/constants';
import useSound, { DEFAULT_VOLUME } from '.';
import * as utils from './utils';

type ReturnResult = ReturnType<typeof useSound>;

const mock = {
  soundPlaySound: false
};

global.window.HTMLMediaElement.prototype.play = jest.fn();

jest.mock('./utils', () => ({
  getShouldPlaySound: jest.fn(() => mock.soundPlaySound)
}));

describe('return value', () => {
  let result: ReturnResult;

  beforeEach(() => {
    render(<BackgroundSound />);

    const {
      result: { current }
    } = renderHook(() => useSound());
    result = current;
  });

  test('return onPlay', () => {
    expect(result.onPlay).toBeDefined();
  });
});

describe('initialization', () => {
  beforeEach(() => {
    render(<BackgroundSound />);
    renderHook(() => useSound());
  });

  test('setup volume', () => {
    const soundDoms = screen.getAllByLabelText(ALT);
    soundDoms.forEach((dom) => {
      expect(dom).toHaveProperty('volume', DEFAULT_VOLUME);
    });
  });
});

describe('onPlay', () => {
  let result: ReturnResult;
  const target = 'dog';
  const getDom = () => {
    const doms = screen.getAllByLabelText(ALT) as HTMLAudioElement[];
    return doms.find((dom) => (dom.src = SOUND[target]));
  };

  beforeEach(() => {
    render(<BackgroundSound />);

    const {
      result: { current }
    } = renderHook(() => useSound());
    result = current;
  });

  test('trigger getShouldPlaySound', () => {
    result.onPlay(target);
    expect(utils.getShouldPlaySound).toBeCalled();
  });

  test('not play when getShouldPlaySound return false', () => {
    result.onPlay(target);
    const dom = getDom()!;
    expect(dom.play).not.toBeCalled();
  });

  test('play when getShouldPlaySound return true', () => {
    mock.soundPlaySound = true;
    result.onPlay(target);
    const dom = getDom()!;
    expect(dom.play).toBeCalled();
  });
});
