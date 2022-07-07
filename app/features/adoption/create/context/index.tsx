import type { Dispatch } from 'react';
import type {
  AnimalInfoState,
  AnimalInfoAction
} from '~/features/adoption/create/hooks/useAnimalInfo';
import { createContext, useState, useContext } from 'react';
import { useFetcher } from '@remix-run/react';
import useAnimalInfo, {
  initialAnimalInfo
} from '~/features/adoption/create/hooks/useAnimalInfo';
import { FETCHER_IDLE_STATE } from '~/constants/utils';

type InitialState = {
  imageUrl: string;
  setImageUrl: (url: string) => void;
  animalInfo: AnimalInfoState;
  dispatchAnimalInfo: Dispatch<AnimalInfoAction>;
};

const initialState: InitialState = {
  imageUrl: '',
  setImageUrl: () => {},
  animalInfo: initialAnimalInfo,
  dispatchAnimalInfo: () => {}
};

export const CreateAdoptionContext = createContext<InitialState>(initialState);
CreateAdoptionContext.displayName = 'Adoption';

type ProviderProps = {
  children: JSX.Element;
};

export const CreateAdoptionContextProvider = ({ children }: ProviderProps) => {
  const [imageUrl, setImageUrl] = useState('');
  const { animalInfo, dispatchAnimalInfo } = useAnimalInfo();

  const fetcher = useFetcher();
  const isLoading = fetcher.state !== FETCHER_IDLE_STATE;

  return (
    <CreateAdoptionContext.Provider
      value={{
        imageUrl,
        setImageUrl,
        animalInfo,
        dispatchAnimalInfo
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
