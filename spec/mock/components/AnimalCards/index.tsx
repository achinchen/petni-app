import type { MouseEvent } from 'react';
import type { Props } from '~/components/common/AnimalCards';
import { ANIMALS } from 'spec/mock/constants/animal';
export { ANIMALS };

export const TEST_ID = 'animal-cards';
export const DELETE_ID = ANIMALS[0].id;

export default function MockAnimalCards(props: Props) {
  const { onDelete, ...resetProps } = props;
  const onMockClick = (event: MouseEvent<HTMLDivElement>) => {
    onDelete(DELETE_ID);
  };

  return <div data-testid={TEST_ID} {...resetProps} onClick={onMockClick} />;
}
