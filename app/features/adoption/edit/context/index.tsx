import type { Dispatch } from 'react';
import type { EditingAnimal } from '~/models/animal/createAnimal/index.server';
import type {
  AnimalInfoState,
  AnimalInfoAction
} from '~/features/adoption/edit/hooks/useAnimalInfo';
import type {
  OtherInfoState,
  OtherInfoAction
} from '~/features/adoption/edit/hooks/useOtherInfo';
import { createContext, useEffect, useState, useMemo, useContext } from 'react';
import { useFetcher, useNavigate } from '@remix-run/react';
import useAnimalInfo, {
  initialAnimalInfo
} from '~/features/adoption/edit/hooks/useAnimalInfo';
import useOtherInfo, {
  initOtherInfo
} from '~/features/adoption/edit/hooks/useOtherInfo';
import { FETCHER_IDLE_STATE } from '~/constants/utils';
import { DEFAULT_VALUE } from '~/constants/options';

type InitialState = {
  imageUrl: string;
  setImageUrl: (url: string) => void;
  animalInfo: AnimalInfoState;
  dispatchAnimalInfo: Dispatch<AnimalInfoAction>;
  otherInfo: OtherInfoState;
  dispatchOtherInfo: Dispatch<OtherInfoAction>;
  canSubmit: boolean;
  isLoading: boolean;
  createAnimal: () => void;
};

const initialState: InitialState = {
  imageUrl: '',
  setImageUrl: () => {},
  animalInfo: initialAnimalInfo,
  dispatchAnimalInfo: () => {},
  otherInfo: initOtherInfo,
  dispatchOtherInfo: () => {},
  canSubmit: false,
  isLoading: false,
  createAnimal: () => {}
};

export const EditAdoptionContext = createContext<InitialState>(initialState);
EditAdoptionContext.displayName = 'Adoption';

type ProviderProps = {
  children: JSX.Element;
};

const NOT_REQUIRED_FIELDS = ['note', 'name'];

export const EditAdoptionContextProvider = ({ children }: ProviderProps) => {
  const [imageUrl, setImageUrl] = useState('');
  const { animalInfo, dispatchAnimalInfo } = useAnimalInfo();
  const { otherInfo, dispatchOtherInfo } = useOtherInfo();

  const canSubmit = useMemo(() => {
    return Object.entries({ ...animalInfo, ...otherInfo }).every(
      ([key, value]) => {
        if (NOT_REQUIRED_FIELDS.includes(key)) return true;
        return Boolean(value) && value !== DEFAULT_VALUE;
      }
    );
  }, [animalInfo, otherInfo]);

  const navigator = useNavigate();

  const fetcher = useFetcher();
  const isLoading = fetcher.state !== FETCHER_IDLE_STATE;

  const createAnimal = () => {
    const formData = new FormData();
    const info = {
      imageUrl,
      name: animalInfo.name,
      size: animalInfo.size,
      color: animalInfo.color,
      family: animalInfo.family,
      gender: animalInfo.gender,
      location: otherInfo.location,
      address: otherInfo.location,
      tel: otherInfo.contact,
      note: otherInfo.note
    } as EditingAnimal;
    formData.set('json', JSON.stringify(info));

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
    <EditAdoptionContext.Provider
      value={{
        imageUrl,
        setImageUrl,
        animalInfo,
        dispatchAnimalInfo,
        otherInfo,
        dispatchOtherInfo,
        canSubmit,
        isLoading,
        createAnimal
      }}
    >
      {children}
    </EditAdoptionContext.Provider>
  );
};

export function useEditAdoptionContext() {
  const context = useContext(EditAdoptionContext);
  if (context === undefined) {
    throw new Error(
      'The EditAdoptionContext hook must be used within a EditAdoptionContext.Provider'
    );
  }
  return context;
}
