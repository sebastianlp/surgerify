import React from "react";
import { useAsync } from "react-async";
import * as auth from "domain/auth";
import { bootstrapApplicationData } from "domain/bootstrap";
import FullPageLoader from "components/FullPageLoader";

const AuthContext = React.createContext();

function AuthProvider(props) {
  const [firstAttemptFinished, setFirstAttemptFinished] = React.useState(false);
  const {
    data = { user: null },
    error,
    isRejected,
    isPending,
    isSettled,
    reload
  } = useAsync({
    promiseFn: bootstrapApplicationData
  });

  React.useLayoutEffect(() => {
    if (isSettled) {
      setFirstAttemptFinished(true);
    }
  }, [isSettled]);

  if (!firstAttemptFinished) {
    if (isPending) {
      return <FullPageLoader />;
    }

    if (isRejected) {
      return (
        <div>
          <p>Ocurrió un problema. Intentá cargando nuevamente la aplicación.</p>
          <pre>{error.message}</pre>
        </div>
      );
    }
  }

  const login = (email, password) =>
    auth
      .login(email, password)
      .then(reload)
      .catch(e => {
        throw e;
      });
  const logout = () => auth.logout().then(reload);

  return <AuthContext.Provider value={{ data, login, logout }} {...props} />;
}

function useAuth() {
  const context = React.useContext(AuthContext);
  if (context === undefined) {
    throw new Error(`useAuth must be used within a AuthProvider`);
  }
  return context;
}

export { AuthProvider, useAuth };
