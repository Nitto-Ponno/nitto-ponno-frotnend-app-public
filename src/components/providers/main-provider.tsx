import React from 'react';
import ReduxProvider from './redux-provider';

function MainProvider({ children }: { children: React.ReactNode }) {
  return <ReduxProvider>{children}</ReduxProvider>;
}

export default MainProvider;
