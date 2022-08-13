import { render, screen } from '@testing-library/react';
import Card from '.';

describe('rendering', () => {
  test('render children', () => {
    const CHILDREN = 'children';
    render(
      <Card>
        <div>{CHILDREN}</div>
      </Card>
    );
    expect(screen.getByText(CHILDREN)).toBeDefined();
  });
});
