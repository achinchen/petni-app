import { createContext, useState, useContext } from 'react';
import type { DetailPetCard } from '~/types';

export type InitialState = {
  currentCard?: DetailPetCard;
  showPanel: boolean;
  setIndex: (index: number) => void;
  setShowPanel: (showPanel: boolean) => void;
  setPets: (pets: DetailPetCard[] | []) => void;
};

const initialState = {
  currentCard: undefined,
  setIndex: () => {},
  showPanel: false,
  setShowPanel: () => {},
  setPets: () => {}
};

export const PairingContext = createContext<InitialState>(initialState);
PairingContext.displayName = 'Pairing';

export const PairingContextProvider = ({
  children
}: {
  children: JSX.Element;
}) => {
  const [pets, setPets] = useState<DetailPetCard[]>([]);

  const [index, setIndex] = useState(0);

  const currentCard = pets[index];

  const [showPanel, setShowPanel] = useState(initialState.showPanel);

  return (
    <PairingContext.Provider
      value={{
        currentCard,
        setIndex,
        showPanel,
        setPets,
        setShowPanel
      }}
    >
      {children}
    </PairingContext.Provider>
  );
};

export function usePairContext() {
  const context = useContext(PairingContext);
  if (context === undefined) {
    throw new Error(
      'The PairingContext hook must be used within a PairingContext.Provider'
    );
  }
  return context;
}
