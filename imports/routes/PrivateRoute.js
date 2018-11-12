import { Meteor } from 'meteor/meteor';
import React from 'react';
import { Route, Redirect } from 'react-router-dom';

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route { ...rest } component={(props) => (
    Meteor.userId() ? (
      <Component {...props}/>
    ) : (
      <Redirect to="/"/>
    )
  )}
  />
);

export default PrivateRoute;