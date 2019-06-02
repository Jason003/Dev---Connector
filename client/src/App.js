import React, { Fragment, useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';
import './App.css';
import store from './store';

import Landing from './components/layout/Landing';
import Navbar from './components/layout/Navbar';
import Alert from './components/layout/Alert';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import Dashboard from './components/dashboard/Dashboard';
import CreateProfile from './components/profile-forms/CreateProfile';
import EditProfile from './components/profile-forms/EditProfile';
import AddEducation from './components/profile-forms/AddEducation';
import AddExperience from './components/profile-forms/AddExperience';
import EditExperience from './components/profile-forms/EditExperience';
import Profiles from './components/profiles/Profiles';
import Profile from './components/profile/Profile';
import Posts from './components/posts/Posts';
import Post from './components/post/Post';

import setAuthToken from './utils/setAuthToken';
import { loadUser } from './actions/auth';
import PrivateRoute from './components/routing/PrivateRoute';

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
          <Route path='/' exact component={Landing} />
          <section className='container'>
            <Alert />
            <Switch>
              <Route path='/register' exact component={Register} />
              <Route path='/login' exact component={Login} />
              <PrivateRoute path='/dashboard' exact component={Dashboard} />
              <PrivateRoute
                path='/create-profile'
                exact
                component={CreateProfile}
              />
              <PrivateRoute
                path='/edit-profile'
                exact
                component={EditProfile}
              />
              <PrivateRoute
                path='/add-experience'
                exact
                component={AddExperience}
              />
              <PrivateRoute
                path='/edit-experience'
                exact
                component={EditExperience}
              />
              <PrivateRoute
                path='/add-education'
                exact
                component={AddEducation}
              />
              <PrivateRoute path='/profiles' exact component={Profiles} />
              <PrivateRoute path='/profile/:id' exact component={Profile} />
              <PrivateRoute path='/posts' exact component={Posts} />
              <PrivateRoute path='/post/:id' exact component={Post} />
            </Switch>
          </section>
        </Fragment>
      </Router>
    </Provider>
  );
};
export default App;
