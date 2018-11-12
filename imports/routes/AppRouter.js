import React from 'react';
import { Router, Route, Switch } from 'react-router-dom';
import createHistory from 'history/createBrowserHistory';

export const history = createHistory();

import Login from '../ui/Login';
import Signup from '../ui/Signup';
import Link from '../ui/Link';
import NotFound from '../ui/NotFound';
import PublicRoute from './PublicRoute';
import PrivateRoute from './PrivateRoute';

const unauthenticatedPages = ['/', '/signup'];
const authenticatedPages = ['/links'];

const AppRouter = (props) => (
  <Router history={history}>
    <Switch>
      <PublicRoute path="/" component={Login} exact={true}/>
      <PublicRoute path="/signup" component={Signup}/>
      <PrivateRoute path="/links" component={Link} />
      <Route path="*" component={NotFound} />
    </Switch>
  </Router>   
);

// this will watch for auth changes when user login / logout
export const onAuthChange = (isAuthenticated) => {
  console.log('onAuthChange>');
  const pathname = history.location.pathname;
  
  const isUnauthenticatedPage = unauthenticatedPages.includes(pathname);
  const isAuthenticatedPage = authenticatedPages.includes(pathname);
  if (isAuthenticated && isUnauthenticatedPage) {
    history.replace('/links');
  }
  else if (!isAuthenticated && isAuthenticatedPage) {
    history.replace('/');
  }
};

export default AppRouter;