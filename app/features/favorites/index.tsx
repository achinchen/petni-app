import { useEffect, useState } from 'react';
import PetCards from '~/components/PetCards';
import type { PetCard } from '~/components/PetCards/types';
import { HeaderPortal } from '~/components/Layout/header';
import { getMockPets, TITLE, SUBTITLE } from './constants';

export default function Favorites() {
  const [pets, setPets] = useState<PetCard[]>();

  const onDelete = (id: number) => {};

  useEffect(() => {
    setPets(getMockPets());
  }, []);

  return (
    <main max-w="lg:262" m="4 xl:auto">
      <HeaderPortal>
        <div m="auto" text="xl" font="bold">
          {TITLE}
        </div>
      </HeaderPortal>
      <div color="gray-450" mt="6" mb="5" text="base center" font="medium">
        {SUBTITLE}
      </div>
      {pets && <PetCards pets={pets} onDeletePet={onDelete} />}
    </main>
  );
}
