import type { Dispatch } from 'react';
import type { CreatedAnimal } from '~/utils/db/createAnimal';
import type {
  AnimalInfoState,
  AnimalInfoAction
} from '~/features/adoption/create/hooks/useAnimalInfo';
import type {
  OtherInfoState,
  OtherInfoAction
} from '~/features/adoption/create/hooks/useOtherInfo';
import { createContext, useEffect, useState, useMemo, useContext } from 'react';
import { useFetcher, useNavigate } from '@remix-run/react';
import useAnimalInfo, {
  initialAnimalInfo
} from '~/features/adoption/create/hooks/useAnimalInfo';
import useOtherInfo, {
  initOtherInfo
} from '~/features/adoption/create/hooks/useOtherInfo';
import { FETCHER_IDLE_STATE } from '~/constants/utils';

type InitialState = {
  imageUrl: string;
  setImageUrl: (url: string) => void;
  animalInfo: AnimalInfoState;
  dispatchAnimalInfo: Dispatch<AnimalInfoAction>;
  otherInfo: OtherInfoState;
  dispatchOtherInfo: Dispatch<OtherInfoAction>;
  canSubmit: boolean;
};

const initialState: InitialState = {
  imageUrl: '',
  setImageUrl: () => {},
  animalInfo: initialAnimalInfo,
  dispatchAnimalInfo: () => {},
  otherInfo: initOtherInfo,
  dispatchOtherInfo: () => {},
  canSubmit: false
};

export const CreateAdoptionContext = createContext<InitialState>(initialState);
CreateAdoptionContext.displayName = 'Adoption';

type ProviderProps = {
  children: JSX.Element;
};

const NOT_REQUIRED_FIELDS = ['note', 'name'];

export const CreateAdoptionContextProvider = ({ children }: ProviderProps) => {
  const [imageUrl, setImageUrl] = useState('');
  const { animalInfo, dispatchAnimalInfo } = useAnimalInfo();
  const { otherInfo, dispatchOtherInfo } = useOtherInfo();
  const canSubmit = useMemo(() => {
    const info = { ...animalInfo, ...otherInfo };
    return Object.entries(info).every(
      ([key, value]) => NOT_REQUIRED_FIELDS.includes(key) || Boolean(value)
    );
  }, [animalInfo, otherInfo]);

  const navigator = useNavigate();

  const fetcher = useFetcher();
  const isLoading = fetcher.state !== FETCHER_IDLE_STATE;

  const createAnimal = (animal: CreatedAnimal) => {
    const formData = new FormData();
    formData.set('json', JSON.stringify(animal));

    fetcher.submit(formData, {
      method: 'post',
      action: '/adoption/create?index',
      replace: false
    });
  };

  useEffect(() => {
    if (fetcher.data?.animal) navigator('/adoption');
  }, [fetcher.data, navigator]);

  return (
    <CreateAdoptionContext.Provider
      value={{
        imageUrl,
        setImageUrl,
        animalInfo,
        dispatchAnimalInfo,
        otherInfo,
        dispatchOtherInfo,
        canSubmit
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
