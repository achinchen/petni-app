import {
  createContext,
  useState,
  useContext,
  Dispatch,
  SetStateAction
} from 'react';
import { Family, INFORMATION } from '~/features/theme/color/constants';

type Information = typeof INFORMATION[Family][number];
type InitialState = {
  family: Family;
  setFamily: Dispatch<SetStateAction<Family>>;
  index: number;
  setIndex: Dispatch<SetStateAction<number>>;
  familyInformation: Information[];
  currentInfo: Information;
};

const initialState = {
  family: Family.Cat,
  setFamily: () => {},
  index: 0,
  setIndex: () => {},
  familyInformation: INFORMATION.CAT,
  currentInfo: INFORMATION.CAT[0]
};

export const ThemeColorContext = createContext<InitialState>(initialState);
ThemeColorContext.displayName = 'ThemeColor';

export const ThemeColorContextProvider = ({
  children
}: {
  children: JSX.Element;
}) => {
  const [family, setFamily] = useState(initialState.family);
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
