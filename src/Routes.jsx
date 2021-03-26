import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from 'react-router-dom';

import PrivateRoute from './guards/PrivateRoute';

import Login from './pages/Login';
import Home from './pages/Home';

const Routes = () => (
  <Router>
    <Switch>
      <Route component={Login} path="/login" />
      <PrivateRoute>
        <Route component={Home} path="/" />
      </PrivateRoute>
      <Redirect to="/" />
    </Switch>
  </Router>
);

export default Routes;
