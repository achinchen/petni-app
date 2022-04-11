import { createContext, useState, useContext } from 'react';
import type { DetailPetCard } from '~/types';

export type InitialState = {
  currentCard?: DetailPetCard;
  setCurrentCard: (currentCard: DetailPetCard | undefined) => void;
  showPanel: boolean;
  setShowPanel: (showPanel: boolean) => void;
};

const initialState = {
  currentCard: undefined,
  setCurrentCard: () => {},
  showPanel: false,
  setShowPanel: () => {}
};

export const PairingContext = createContext<InitialState>(initialState);
PairingContext.displayName = 'Pairing';

export const PairingContextProvider = ({
  children
}: {
  children: JSX.Element;
}) => {
  const [currentCard, setCurrentCard] = useState<DetailPetCard | undefined>(
    initialState.currentCard
  );

  const [showPanel, setShowPanel] = useState(initialState.showPanel);

  return (
    <PairingContext.Provider
      value={{
        currentCard,
        setCurrentCard,
        showPanel,
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
