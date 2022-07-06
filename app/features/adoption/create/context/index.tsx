import { createContext, useState, useEffect, useContext } from 'react';
import { useFetcher } from '@remix-run/react';
import { FETCHER_IDLE_STATE } from '~/constants/utils';

export type InitialState = {
  imageUrl: string;
  setImageUrl: (url: string) => void;
};

const initialState = {
  imageUrl: '',
  setImageUrl: (url = '') => {}
};

export const CreateAdoptionContext = createContext<InitialState>(initialState);
CreateAdoptionContext.displayName = 'Adoption';

type ProviderProps = {
  children: JSX.Element;
};

export const CreateAdoptionContextProvider = ({ children }: ProviderProps) => {
  const [imageUrl, setImageUrl] = useState('');

  const fetcher = useFetcher();
  const isLoading = fetcher.state !== FETCHER_IDLE_STATE;

  // const fetchAnimals = (
  //   { replace }: { replace: boolean } = { replace: false }
  // ) => {
  //   const options = getFilterPreference() || {};

  //   const payload = Object.keys(options).reduce((temp: Filter, key) => {
  //     const value = options[key as keyof typeof options];
  //     if (value !== DEFAULT_VALUE) temp[key as keyof Filter] = value;
  //     return temp;
  //   }, {});

  //   const formData = new FormData();
  //   formData.set('json', JSON.stringify(payload));

  //   fetcher.submit(formData, {
  //     method: 'post',
  //     action: '/?index',
  //     replace
  //   });
  // };

  // const refreshCards = () => {
  //   setIndex(RANDOM_RECOMMENDATION_COUNT);
  //   fetchAnimals({ replace: true });
  // };

  // useEffect(() => {
  //   if (fetcher.data?.animals) setAnimals(fetcher.data.animals);
  // }, [fetcher.data]);

  return (
    <CreateAdoptionContext.Provider
      value={{
        imageUrl,
        setImageUrl
      }}
    >
      {children}
    </CreateAdoptionContext.Provider>
  );
};

export function useCreateAdoptionContext() {
  const context = useContext(CreateAdoptionContext);
  if (context === undefined) {
    throw new Error(
      'The CreateAdoptionContext hook must be used within a CreateAdoptionContext.Provider'
    );
  }
  return context;
}
