import type { MouseEvent } from 'react';
import type { Animal } from 'server/entities/animal';
import { useState } from 'react';
import { Link } from '@remix-run/react';
import { getIconByGenderAndFamily } from '~/utils/icon';
import Card from './Card';
import Icon, { Close } from '~/components/common/Icon';
import DeletePanel from '~/components/common/DeletePanel';

export type Props = {
  animals: Animal[];
  onDelete: (id: number) => void;
  children?: JSX.Element;
};

const INITIAL_ID = -1;

export default function AnimalCards({ animals, onDelete, children }: Props) {
  const [targetId, setTargetId] = useState(INITIAL_ID);

  const isOpenDeletePanel = targetId > 0;

  const onDeletePanelClose = () => setTargetId(INITIAL_ID);
  const onDeletePanelConfirm = async () => {
    await onDelete(targetId);
    onDeletePanelClose();
  };

  const onDeleteButton =
    (id: Animal['id']) => (event: MouseEvent<HTMLButtonElement>) => {
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
                <img
                  h="100%"
                  w="100%"
                  border="rounded-7"
                  object="cover center"
                  src={imageUrl}
                  alt={`${id} 的照片`}
                />
                <button
                  position="absolute"
                  flex="~"
                  justify="center"
                  items="center"
                  top="2"
                  right="3"
                  w="6"
                  h="6"
                  border="rounded-1/2"
                  bg="white"
                  shadow="default"
                  onClick={onDeleteButton(id)}
                >
                  <Icon
                    size="md"
                    color="gray-450"
                    icon={Close}
                    label="delete"
                  />
                </button>
              </figure>
              <h2
                position="relative"
                flex="~"
                justify="between"
                items="center"
                text="base"
                m="0"
                mx="1"
              >
                {id}
                <Icon
                  size="base"
                  {...getIconByGenderAndFamily({ gender, family })}
                />
              </h2>
              <div color="gray-450" text="sm" font="medium" mx="1">
                {location}
              </div>
            </Link>
          </Card>
        ))}
      </div>
    </section>
  );
}
