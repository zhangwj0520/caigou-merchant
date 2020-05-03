import React from 'react';
import { Switch, BrowserRouter as Router, Route, Redirect } from 'react-router-dom';
import { useStore } from '@hooks';

import Login from '@pages/login';
import App from '@layouts/index';

const Root = () => {
  const { token } = useStore('basic');

  return (
    <Router>
      <Switch>
        <Route component={Login} exact path="/login" />
        <Route render={() => (token ? <App /> : <Redirect to="/login" />)} />
      </Switch>
    </Router>
  );
};

export default Root;
