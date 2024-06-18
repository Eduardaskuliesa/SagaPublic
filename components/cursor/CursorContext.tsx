/* eslint-disable react/jsx-no-constructed-context-values */
/* eslint-disable max-len */

'use client';

import React, {
  createContext, useState, ReactNode,
} from 'react';

type CursorContextProps = {
  view: boolean;
  more: boolean,
  play: boolean,
  dot: boolean,
  none: boolean,
  [key: string]: boolean
};

export const CursorContext = createContext<[CursorContextProps, React.Dispatch<React.SetStateAction<CursorContextProps>>]>([{
  view: false,
  more: false,
  dot: false,
  play: false,
  none: false,
}, () => {}]);

interface CursorContextProviderProps {
  children: ReactNode;
}

const CursorContextProvider: React.FC<CursorContextProviderProps> = ({ children }) => {
  const [cursor, setCursor] = useState<CursorContextProps>({
    view: false,
    more: false,
    play: false,
    dot: false,
    none: false,
  });

  return (
    <CursorContext.Provider value={[cursor, setCursor]}>
      {children}
    </CursorContext.Provider>
  );
};

export default CursorContextProvider;
