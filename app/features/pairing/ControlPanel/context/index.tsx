import type { Dispatch } from 'react';
import type {
  Action as FilterAction,
  FilterState
} from '~/features/pairing/ControlPanel/hooks/useFilterState';
import type {
  Setting,
  SettingState
} from '~/features/pairing/ControlPanel/hooks/useSettingState';

import { createContext, useContext } from 'react';
import useFilterState, {
  initialFilter
} from '~/features/pairing/ControlPanel/hooks/useFilterState';
import useSettingState, {
  initialSetting
} from '~/features/pairing/ControlPanel/hooks/useSettingState';

type InitialState = {
  filter: FilterState;
  dispatchFilter: Dispatch<FilterAction>;
  setting: SettingState;
  dispatchSetting: Dispatch<Setting>;
};

export const initialState = {
  filter: initialFilter,
  dispatchFilter: () => {},
  setting: initialSetting,
  dispatchSetting: () => {}
};

export const ControlContext = createContext<InitialState>(initialState);
ControlContext.displayName = 'ControlContext';

export const ControlContextProvider = ({
  children
}: {
  children: JSX.Element;
}) => {
  const { filter, dispatchFilter } = useFilterState();
  const { setting, dispatchSetting } = useSettingState();

  return (
    <ControlContext.Provider
      value={{
        filter,
        dispatchFilter,
        setting,
        dispatchSetting
      }}
    >
      {children}
    </ControlContext.Provider>
  );
};

export function useControlContext() {
  const context = useContext(ControlContext);
  if (context === undefined) {
    throw new Error(
      'The PairingContext hook must be used within a ControlContextProvider.Provider'
    );
  }
  return context;
}
