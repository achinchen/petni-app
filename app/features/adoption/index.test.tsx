import type { Parameters as UseUploadImageParameters } from './hooks/useUploadImage';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MockComponent, getProp } from 'spec/utils/getMockComponent';
import MockAnimalCards, {
  TEST_ID as ANIMAL_CARDS_TEST_ID,
  ANIMALS
} from 'spec/mock/components/AnimalCards';
import { getPNGFile } from 'spec/utils/getMockFile';
import { BrowserRouter as Router } from 'react-router-dom';
import { UPLOAD_IMAGE_PLACEHOLDER } from './constants';

import Adoption from '.';

const mock = {
  isLoading: false,
  onUpload: jest.fn(),
  onDelete: jest.fn(),
  navigator: jest.fn()
};

jest.mock('@remix-run/react', () => {
  const remix = jest.requireActual('@remix-run/react');
  return {
    __esModule: true,
    ...remix,
    useNavigate: () => mock.navigator
  };
});

jest.mock('./hooks/useUploadImage', () => ({
  __esModule: true,
  default: ({ onFinish }: UseUploadImageParameters) => {
    mock.onUpload = jest.fn(() => onFinish('https://mock-image-url'));
    return {
      isLoading: mock.isLoading,
      onUpload: mock.onUpload
    };
  }
}));

jest.mock('./hooks/useDeleteAnimal', () => ({
  __esModule: true,
  default: () => ({
    onDelete: mock.onDelete
  })
}));

const testId = {
  loginPanel: 'LoginPanel',
  animalCards: ANIMAL_CARDS_TEST_ID
};

jest.mock('~/components/common/AnimalCards', () => MockAnimalCards);
jest.mock('~/components/common/LoginPanel', () => MockComponent('LoginPanel'));

const user = {
  id: 1,
  name: 'example',
  imageUrl: 'https://example.com/',
  email: 'example@example.com'
};

describe('rendering', () => {
  beforeEach(() => {
    render(
      <Router>
        <Adoption user={user} animals={ANIMALS} />
      </Router>
    );
  });

  test('render uploader', () => {
    expect(screen.getByText(UPLOAD_IMAGE_PLACEHOLDER)).toBeDefined();
  });

  test('render LoginPanel', () => {
    expect(screen.getByTestId(testId.loginPanel)).toBeDefined();
  });

  test('render Animals', () => {
    expect(screen.getByTestId(testId.animalCards)).toBeDefined();
  });
});

describe('interaction: delete', () => {
  beforeEach(async () => {
    render(
      <Router>
        <Adoption user={user} animals={ANIMALS} />
      </Router>
    );
    const animalCards = screen.getByTestId(testId.animalCards);
    await userEvent.click(animalCards);
  });

  test('trigger onDelete', () => {
    expect(mock.onDelete).toBeCalled();
  });
});

async function setupComponentAndTriggerUploader() {
  render(
    <Router>
      <Adoption user={user} animals={ANIMALS} />
    </Router>
  );

  await userEvent.upload(
    screen.getByText(UPLOAD_IMAGE_PLACEHOLDER).getElementsByTagName('input')[0],
    getPNGFile()
  );
}

async function setupComponentAndClickUploader(withUser = true) {
  render(
    <Router>
      <Adoption user={withUser ? user : null} animals={ANIMALS} />
    </Router>
  );

  await userEvent.click(screen.getByText(UPLOAD_IMAGE_PLACEHOLDER));
}

describe('interaction: click uploader', () => {
  test('disabled input when isUploadLoading is true', async () => {
    mock.isLoading = true;
    await setupComponentAndTriggerUploader();
    expect(
      screen
        .getByText(UPLOAD_IMAGE_PLACEHOLDER)
        .getElementsByTagName('input')[0]
    ).toHaveProperty('disabled');
  });

  test('not open LoginPanel when user is truthy', async () => {
    await setupComponentAndClickUploader(true);
    expect(getProp('isOpen', testId.loginPanel)).toBe('false');
  });

  test('open LoginPanel when user is null', async () => {
    await setupComponentAndClickUploader(false);
    await expect(getProp('isOpen', testId.loginPanel)).toBe('true');
  });

  test('close LoginPanel when trigger onClose', async () => {
    await setupComponentAndClickUploader(false);
    await userEvent.click(screen.getByTestId(testId.loginPanel));
    expect(getProp('isOpen', testId.loginPanel)).toBe('false');
  });
});

describe('interaction: upload', () => {
  beforeEach(() => {
    mock.isLoading = false;
  });

  test('not trigger onUpload when isUploadLoading is true', async () => {
    mock.isLoading = true;
    await setupComponentAndTriggerUploader();
    expect(mock.onUpload).not.toBeCalled();
  });

  test('trigger onUpload', async () => {
    await setupComponentAndTriggerUploader();
    expect(mock.onUpload).toBeCalled();
  });

  test('trigger navigator when completed', async () => {
    await setupComponentAndTriggerUploader();
    expect(mock.navigator).toBeCalledWith('/adoption/create');
  });
});
