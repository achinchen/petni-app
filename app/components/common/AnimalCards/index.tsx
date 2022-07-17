import type { MouseEvent } from 'react';
import type { SimpleAnimal } from '~/models/animal/type';
import { useState } from 'react';
import { Link } from '@remix-run/react';
import { getIconByGenderAndFamily } from '~/utils';
import Card from './Card';
import Icon from '~/components/common/Icon';
import DeletePanel from '~/components/common/DeletePanel';

type Props = {
  animals: SimpleAnimal[];
  onDelete: (id: number) => void;
  children?: JSX.Element;
};

const INITIAL_ID = -1;

export default function AnimalCards({ animals, onDelete, children }: Props) {
  const [targetId, setTargetId] = useState(INITIAL_ID);

  const isOpenDeletePanel = targetId > 0;

  const onDeletePanelClose = () => setTargetId(INITIAL_ID);
  const onDeletePanelConfirm = () => {
    onDelete(targetId);
    onDeletePanelClose();
  };

  const onDeleteButton =
    (id: SimpleAnimal['id']) => (event: MouseEvent<HTMLButtonElement>) => {
      event.preventDefault();
      setTargetId(id);
    };

  return (
    <section>
      <DeletePanel
        isOpen={isOpenDeletePanel}
        onClose={onDeletePanelClose}
        onConfirm={onDeletePanelConfirm}
      />
      <div
        grid="~ gap-4 sm:gap-3"
        justify="center"
        className="grid-cols-[repeat(auto-fill,10rem)]"
      >
        {children && <Card>{children}</Card>}
        {animals.map(({ id, family, gender, imageUrl, location }) => (
          <Card key={id}>
            <Link to={`/pets/${id}`}>
              <figure w="34" h="34" position="relative" m="0">
                <div
                  role="img"
                  h="100%"
                  bg="cover center"
                  border="rounded-7"
                  style={{ backgroundImage: `url(${imageUrl})` }}
                  alt={`${id} 的照片`}
                />
                <button
                  position="absolute"
                  flex="~"
                  justify="center"
                  content="center"
                  top="2"
                  right="3"
                  w="6"
                  h="6"
                  border="rounded-1/2"
                  bg="white"
                  shadow="default"
                  onClick={onDeleteButton(id)}
                >
                  <Icon icon="CloseSm" />
                </button>
              </figure>
              <h2 position="relative" text="base" mt="2" mb="0" mx="0">
                {id}
                <Icon
                  icon={getIconByGenderAndFamily({ gender, family })}
                  position="absolute"
                  right="0"
                />
              </h2>
              <div color="gray-450" text="sm" font="medium" m="0">
                {location}
              </div>
            </Link>
          </Card>
        ))}
      </div>
    </section>
  );
}
