import type { Animal } from '@prisma/client';
import type { Filter } from '~/models/animal/getAnimalsByFilter/index.server';
import { createContext, useState, useEffect, useContext } from 'react';
import { useFetcher } from '@remix-run/react';
import { getFilterPreference } from '~/features/pairing/ControlPanel/utils';
import { DEFAULT_OPTION } from '~/constants/options';
import { FETCHER_IDLE_STATE } from '~/constants/utils';

export type InitialState = {
  currentCard?: Animal;
  recommendCards?: Animal[];
  showPanel: boolean;
  setShowPanel: (showPanel: boolean) => void;
  isLoading: boolean;
  onNext: () => void;
  refreshCards: () => void;
};

const initialState = {
  currentCard: undefined,
  recommendCards: [],
  onNext: () => {},
  showPanel: false,
  isLoading: false,
  setShowPanel: () => {},
  refreshCards: () => {}
};

export const PairingContext = createContext<InitialState>(initialState);
PairingContext.displayName = 'Pairing';

type ProviderProps = {
  children: JSX.Element;
};

const RANDOM_RECOMMENDATION_COUNT = 3;

export const PairingContextProvider = ({ children }: ProviderProps) => {
  const [animals, setAnimals] = useState<Animal[]>([]);
  const [index, setIndex] = useState(RANDOM_RECOMMENDATION_COUNT);
  const [showPanel, setShowPanel] = useState(initialState.showPanel);

  const fetcher = useFetcher();
  const isLoading = fetcher.state !== FETCHER_IDLE_STATE;

  const currentCard = animals[index];
  const recommendCards = animals.slice(0, RANDOM_RECOMMENDATION_COUNT);

  const fetchAnimals = (
    { replace }: { replace: boolean } = { replace: false }
  ) => {
    const options = getFilterPreference() || {};

    const payload = Object.keys(options).reduce((temp: Filter, key) => {
      const value = options[key as keyof typeof options];
      if (value !== DEFAULT_OPTION.VALUE) temp[key as keyof Filter] = value;
      return temp;
    }, {});

    const formData = new FormData();
    formData.set('json', JSON.stringify(payload));

    fetcher.submit(formData, {
      method: 'post',
      action: '/?index',
      replace
    });
  };

  const refreshCards = () => {
    setIndex(RANDOM_RECOMMENDATION_COUNT);
    fetchAnimals({ replace: true });
  };

  const onNext = () => {
    setIndex((index) => {
      if (index < animals.length - 1) return index + 1;
      fetchAnimals();
      return RANDOM_RECOMMENDATION_COUNT;
    });
  };

  useEffect(() => {
    if (fetcher.data?.animals) setAnimals(fetcher.data.animals);
  }, [fetcher.data]);

  useEffect(() => {
    fetchAnimals({ replace: false });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <PairingContext.Provider
      value={{
        currentCard,
        recommendCards,
        onNext,
        refreshCards,
        showPanel,
        setShowPanel,
        isLoading
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
