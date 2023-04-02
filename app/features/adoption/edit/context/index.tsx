import type { Animal } from 'server/entities/animal';
import type { LooseAnimal } from 'server/gateways/animal';
import type { Dispatch } from 'react';
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
  INITIAL_ANIMAL_INFO
} from '~/features/adoption/edit/hooks/useAnimalInfo';
import useOtherInfo, {
  INITIAL_OTHER_INFO
} from '~/features/adoption/edit/hooks/useOtherInfo';
import { setAdoptionImageUrl } from '~/features/adoption/utils';
import { FETCHER_IDLE_STATE } from '~/constants/utils';
import { DEFAULT_VALUE } from '~/constants/options';

export type InitialState = {
  imageUrl: string;
  setImageUrl: (url: string) => void;
  animalInfo: AnimalInfoState;
  dispatchAnimalInfo: Dispatch<AnimalInfoAction>;
  otherInfo: OtherInfoState;
  dispatchOtherInfo: Dispatch<OtherInfoAction>;
  canSubmit: boolean;
  isLoading: boolean;
  isEditMode: boolean;
  onSubmit: () => void;
};

export const initialState: InitialState = {
  imageUrl: '',
  setImageUrl: () => {},
  animalInfo: INITIAL_ANIMAL_INFO,
  dispatchAnimalInfo: () => {},
  otherInfo: INITIAL_OTHER_INFO,
  dispatchOtherInfo: () => {},
  canSubmit: false,
  isLoading: false,
  isEditMode: false,
  onSubmit: () => {}
};

export const EditAdoptionContext = createContext<InitialState>(initialState);
EditAdoptionContext.displayName = 'Adoption';

type ProviderProps = {
  animal?: Animal;
  children: JSX.Element;
};

const NOT_REQUIRED_FIELDS = ['note', 'name'];

export const EditAdoptionContextProvider = ({
  children,
  animal
}: ProviderProps) => {
  const isEditMode = Boolean(animal);
  const [imageUrl, setImageUrl] = useState('');
  const { animalInfo, dispatchAnimalInfo } = useAnimalInfo(animal);
  const { otherInfo, dispatchOtherInfo } = useOtherInfo(animal);

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

  const onSubmit = () => {
    const formData = new FormData();
    const info = {
      id: animal?.id,
      imageUrl,
      name: animalInfo.name,
      size: animalInfo.size,
      color: animalInfo.color,
      family: animalInfo.family,
      gender: animalInfo.gender,
      location: otherInfo.location,
      tel: otherInfo.contact,
      note: otherInfo.note
    } as unknown as LooseAnimal;
    formData.set('json', JSON.stringify(info));

    fetcher.submit(formData, {
      method: 'post',
      action: isEditMode
        ? `/adoption/${animal!.id}?index`
        : '/adoption/create?index',
      replace: false
    });

    setAdoptionImageUrl('');
  };

  useEffect(() => {
    if (fetcher.data?.animal) navigator('/adoption');
  }, [fetcher.data, navigator]);

  useEffect(() => {
    if (!imageUrl && animal) setImageUrl(animal.imageUrl);
  }, [animal, imageUrl]);

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
        isEditMode,
        onSubmit
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
