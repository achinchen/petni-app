import type { Animal } from 'server/entities/animal';
import type { Options } from 'server/gateways/animal';
import { createContext, useState, useEffect, useContext } from 'react';
import { useFetcher } from '@remix-run/react';
import {
  getFilter,
  getLocationCity
} from '~/features/pairing/ControlPanel/utils';
import { DEFAULT_VALUE } from '~/constants/options';
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
    const filter = getFilter() || {};
    const city = getLocationCity();

    const payload = Object.keys(filter).reduce((temp: Options, key) => {
      const value = filter[key as keyof typeof filter];
      if (value !== DEFAULT_VALUE) temp[key as keyof Options] = value;
      return temp;
    }, {});

    const formData = new FormData();
    formData.set('json', JSON.stringify({ ...payload, city }));

    fetcher.submit(formData, {
      method: 'post',
      action: '/?index',
      replace
    });
  };

  const refreshCards = () => {
    setIndex(RANDOM_RECOMMENDATION_COUNT);
    fetchAnimals();
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
    fetchAnimals();
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
