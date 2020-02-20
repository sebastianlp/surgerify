import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom";

import Layout from "components/Layout";

import Surgeries from "views/Surgeries";

function AuthenticatedApp() {
  return (
    <Router>
      <Layout>
        <Switch>
          <Route exact path="/">
            <Redirect to="/surgeries" />
          </Route>
          <Route path="/surgeries">
            <Surgeries />
          </Route>
        </Switch>
      </Layout>
    </Router>
  );
}

export default AuthenticatedApp;
