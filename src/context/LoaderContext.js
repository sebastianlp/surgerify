import React from 'react';
import FullPageLoader from 'components/FullPageLoader';

const LoaderContext = React.createContext();

function LoaderProvider(props) {
  const [isVisible, setIsVisible] = React.useState(false);

  const value = React.useMemo(() => setIsVisible, [setIsVisible]);

  return (
    <LoaderContext.Provider value={value}>
      {props.children}
      {isVisible && <FullPageLoader />}
    </LoaderContext.Provider>
  );
}

function useLoader() {
  const context = React.useContext(LoaderContext);
  if (context === undefined) {
    throw new Error(`useLoader must be used whithin a LoaderProvider`);
  }
  return context;
}

export { LoaderProvider, useLoader };
