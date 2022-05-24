import type { PetCard } from '~/components/common/PetCards/types';
import { useEffect, useState } from 'react';
import PetCards from '~/components/common/PetCards';
import { HeaderPortal } from '~/components/common/Layout/Header';
import { getMockPets, TITLE, SUBTITLE } from './constants';

export default function Favorites() {
  const [pets, setPets] = useState<PetCard[]>();

  const onDelete = (id: number) => {};

  useEffect(() => {
    setPets(getMockPets());
  }, []);

  return (
    <main className="content-width" m="4 lg:auto">
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
