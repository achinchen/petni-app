import { Fragment, useState } from 'react';
import Icon from '~/components/icon';
import DeletePanel from '~/components/delete-panel';
import type { PetCard } from './types';

type Props = {
  pets: PetCard[];
  onDeletePet: (id: number) => void;
};

export default function PetCards(props: Props) {
  const [pets] = useState<PetCard[]>(props.pets);
  const [deletePetId, setDeletePetId] = useState(-1);

  const isOpenDeletePanel = deletePetId > 0;

  const onDeletePanelClose = () => setDeletePetId(-1);
  const onDeletePanelConfirm = () => {
    props.onDeletePet(deletePetId);
    onDeletePanelClose();
  };

  const onDelete = (id: number) => () => setDeletePetId(id);

  return (
    <Fragment>
      <DeletePanel
        isOpen={isOpenDeletePanel}
        onClose={onDeletePanelClose}
        onConfirm={onDeletePanelConfirm}
      />
      <div flex="~ row wrap gap-4.5 lg:gap-3">
        {pets.map(({ id, image, location, gender }) => (
          <section
            key={id}
            flex="~ col"
            w="38.75 md:42.5 lg:40.5"
            h="51 md:56.5 lg:53"
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
    </Fragment>
  );
}
