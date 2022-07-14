import type { Dispatch, SetStateAction } from 'react';
import { createContext, useState, useContext } from 'react';
import { Area } from '~/features/hospital/constants';

export type InitialState = {
  area: Area;
  setArea: Dispatch<SetStateAction<Area>>;
};

const initialState = {
  area: Area.Northern,
  setArea: () => {}
};

export const HospitalContext = createContext<InitialState>(initialState);
HospitalContext.displayName = 'Hospital';

export const HospitalContextProvider = ({
  children
}: {
  children: JSX.Element;
}) => {
  const [area, setArea] = useState(initialState.area);

  return (
    <HospitalContext.Provider
      value={{
        area,
        setArea
      }}
    >
      {children}
    </HospitalContext.Provider>
  );
};

export function useHospitalContext() {
  const context = useContext(HospitalContext);
  if (context === undefined) {
    throw new Error(
      'The HospitalContext hook must be used within a HospitalContext.Provider'
    );
  }
  return context;
}
