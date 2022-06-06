import { createContext, useState, useContext } from 'react';
import type { Pet } from '~/features/pet/types';

export type InitialState = {
  pet?: Pet;
};

const initialState = {
  pet: undefined
};

export const PetContext = createContext<InitialState>(initialState);
PetContext.displayName = 'Pet';

export const PetContextProvider = (props: {
  children: JSX.Element;
  pet: Pet;
}) => {
  const [pet, setPet] = useState(props.pet);

  return (
    <PetContext.Provider
      value={{
        pet
      }}
    >
      {props.children}
    </PetContext.Provider>
  );
};

export function usePetContext() {
  const context = useContext(PetContext);
  if (context === undefined) {
    throw new Error(
      'The usePetContext hook must be used within a PetContext.Provider'
    );
  }
  return context;
}
