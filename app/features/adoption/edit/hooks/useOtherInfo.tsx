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

export const initOtherInfo = {
  location: '',
  contact: '',
  note: ''
};

function reducer(state: OtherInfoState, { type, value }: OtherInfoAction) {
  return { ...state, [type]: value };
}

export default function useOtherInfo() {
  const [otherInfo, dispatchOtherInfo] = useReducer(reducer, initOtherInfo);
  return { otherInfo, dispatchOtherInfo };
}
