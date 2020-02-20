import React from "react";
import { useUser } from "context/UserContext";
import FullPageLoader from "components/FullPageLoader";

const loadAuthenticatedApp = () => import("./AuthenticatedApp");
const AuthenticatedApp = React.lazy(loadAuthenticatedApp);
const UnauthenticatedApp = React.lazy(() => import("./UnauthenticatedApp"));

function App() {
  const user = useUser();

  React.useEffect(() => {
    loadAuthenticatedApp();
  }, []);

  return (
    <React.Suspense fallback={<FullPageLoader />}>
      {user ? <AuthenticatedApp /> : <UnauthenticatedApp />}
    </React.Suspense>
  );
}

export default App;
