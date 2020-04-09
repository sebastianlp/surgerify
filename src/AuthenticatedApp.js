import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom';

import Layout from 'components/Layout';

import Surgeries from 'views/Surgeries';
import NewSurgery from 'views/NewSurgery';

function AuthenticatedApp() {
  return (
    <Router>
      <Layout>
        <Switch>
          <Route exact path="/">
            <Redirect to="/surgeries" />
          </Route>
          <Route exact path="/surgeries">
            <Surgeries />
          </Route>
          <Router path="/new/surgery">
            <NewSurgery />
          </Router>
        </Switch>
      </Layout>
    </Router>
  );
}

export default AuthenticatedApp;
