import type { Animal } from 'server/entities/animal';
import { useReducer } from 'react';

export type OtherInfoState = {
  location: string;
  contact: string;
  note: string;
};

type OtherInfoType = keyof OtherInfoState;
type Payload = ValueOf<OtherInfoState>;

export type OtherInfoAction = {
  type: OtherInfoType;
  value: Payload;
};

export const INITIAL_OTHER_INFO = {
  location: '',
  contact: '',
  note: ''
};

export const getInitialOtherInfo = (animal?: Animal) => {
  if (!animal) return INITIAL_OTHER_INFO;
  return {
    location: animal.location,
    contact: animal.tel,
    note: animal.note
  };
};

function reducer(state: OtherInfoState, { type, value }: OtherInfoAction) {
  return { ...state, [type]: value };
}

export default function useOtherInfo(animal?: Animal) {
  const [otherInfo, dispatchOtherInfo] = useReducer(
    reducer,
    getInitialOtherInfo(animal)
  );
  return { otherInfo, dispatchOtherInfo };
}
