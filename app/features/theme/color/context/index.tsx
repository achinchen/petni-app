import type { Dispatch, SetStateAction } from 'react';
import { createContext, useState, useContext } from 'react';
import { Family } from '~/constants';
import { INFORMATION } from '~/features/theme/color/constants';

type Information = typeof INFORMATION[Family][number];
type InitialState = {
  family: Family;
  setFamily: Dispatch<SetStateAction<Family>>;
  index: number;
  setIndex: Dispatch<SetStateAction<number>>;
  familyInformation: Information[];
  currentInfo: Information;
};

export const initialState = {
  family: Family.Cat,
  setFamily: () => {},
  index: 0,
  setIndex: () => {},
  familyInformation: INFORMATION.Cat,
  currentInfo: INFORMATION.Cat[0]
};

export const ThemeColorContext = createContext<InitialState>(initialState);
ThemeColorContext.displayName = 'ThemeColor';

export const ThemeColorContextProvider = ({
  children
}: {
  children: JSX.Element;
}) => {
  const [family, setFamily] = useState<Family>(initialState.family);
  const [index, setIndex] = useState<InitialState['index']>(initialState.index);
  const familyInformation = INFORMATION[family];
  const currentInfo = familyInformation[index];

  return (
    <ThemeColorContext.Provider
      value={{
        family,
        setFamily,
        index,
        setIndex,
        familyInformation,
        currentInfo
      }}
    >
      {children}
    </ThemeColorContext.Provider>
  );
};

export function useThemeColorContext() {
  const context = useContext(ThemeColorContext);
  if (context === undefined) {
    throw new Error(
      'The useThemeColorContext hook must be used within a ThemeColorContext.Provider'
    );
  }
  return context;
}
