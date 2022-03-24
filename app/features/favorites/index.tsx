import { useEffect, useState } from 'react';
import Icon from '~/components/icon';
import PetCards from '~/components/pet-cards';
import type { PetCard } from './types';
import { getMockPets, SUBTITLE } from './constants';

export default function Favorites() {
  const [pets, setPets] = useState<PetCard[]>();

  const onDelete = (id: number) => {};

  useEffect(() => {
    setPets(getMockPets());
  }, []);

  return (
    <main max-w="lg:262" m="4 xl:auto">
      <div color="gray-450" mt="6" mb="5" text="base center" font="medium">
        {SUBTITLE}
      </div>
      {pets && <PetCards pets={pets} onDeletePet={onDelete} />}
    </main>
  );
}
