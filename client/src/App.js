import React, { Fragment, useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';
import './App.css';
import store from './store';

import Landing from './components/layout/Landing';
import Navbar from './components/layout/Navbar';
import Routes from './components/routing/Routes';

import setAuthToken from './utils/setAuthToken';
import { loadUser } from './actions/auth';

// set the token when user loads
if (localStorage.token) {
  setAuthToken(localStorage.token);
}

const App = () => {
  // get user when user loads
  useEffect(() => {
    store.dispatch(loadUser());
  }, []); // [] make sure it only runs once(the 1st load)
  return (
    <Provider store={store}>
      <Router>
        <Fragment>
          <Navbar />
          <Switch>
            <Route path='/' exact component={Landing} />
            <Route component={Routes} />
          </Switch>
        </Fragment>
      </Router>
    </Provider>
  );
};
export default App;
