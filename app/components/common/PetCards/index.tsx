import { useState } from 'react';
import Icon from '~/components/common/Icon';
import DeletePanel from '~/components/common/DeletePanel';
import type { PetCard } from './types';

type Props = {
  pets: PetCard[];
  onDeletePet: (id: number) => void;
};

export default function PetCards({ pets, onDeletePet }: Props) {
  const [deletePetId, setDeletePetId] = useState(-1);

  const isOpenDeletePanel = deletePetId > 0;

  const onDeletePanelClose = () => setDeletePetId(-1);
  const onDeletePanelConfirm = () => {
    onDeletePet(deletePetId);
    onDeletePanelClose();
  };

  const onDelete = (id: number) => () => setDeletePetId(id);

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
        {pets.map(({ id, image, location, gender }) => (
          <section
            key={id}
            flex="~ col"
            w="40"
            h="54"
            p="3"
            bg="white"
            shadow="default"
            border="rounded-7"
          >
            <figure position="relative" m="0" border="rounded-7">
              <img w="100%" src={image} alt={`照片`} />
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
                onClick={onDelete(id)}
              >
                <Icon icon="CloseSm" />
              </button>
            </figure>
            <h2 position="relative" text="base" mt="2" mb="0" mx="0">
              {id}
              <Icon icon={gender} position="absolute" right="0" />
            </h2>
            <div color="gray-450" text="sm" font="medium" m="0">
              {location}
            </div>
          </section>
        ))}
      </div>
    </section>
  );
}
