import React from 'react';
import Snackbar from 'components/Snackbar';

const SnackbarContext = React.createContext();

const SNACKBAR_TTL = 3500;

const initialState = {
  message: '',
  severity: '',
  show: false,
  ttl: SNACKBAR_TTL,
};

const snackbarReducer = function(state, snackbar) {
  return {
    ...state,
    ...snackbar,
  };
};

function SnackbarProvider(props) {
  const [snackbar, dispatchSnackbar] = React.useReducer(
    snackbarReducer,
    initialState
  );

  React.useEffect(() => {
    if (snackbar.show) {
      const timer = setTimeout(() => {
        dispatchSnackbar({ show: false });
      }, SNACKBAR_TTL);

      return () => clearTimeout(timer);
    }
  }, [snackbar]);

  const addSnackbar = React.useCallback(
    (message, severity) =>
      dispatchSnackbar({
        key: Date.now(),
        show: true,
        message,
        severity,
      }),
    []
  );

  const value = React.useMemo(() => addSnackbar, [addSnackbar]);

  return (
    <SnackbarContext.Provider value={value}>
      {props.children}
      <Snackbar {...snackbar} />
    </SnackbarContext.Provider>
  );
}

function useSnackbar() {
  const context = React.useContext(SnackbarContext);
  if (context === undefined) {
    throw new Error(`useSnackbar must be used within a SnackbarProvider`);
  }
  return context;
}

export { SnackbarProvider, useSnackbar };
