import { Meteor } from 'meteor/meteor';
import React from 'react';
import { Route, Redirect } from 'react-router-dom';

const PublicRoute = ({ component: Component, ...rest }) => (
  <Route { ...rest } component={(props) => (
    Meteor.userId() ? (
      <Redirect to="/links"/>
    ) : (
      <Component {...props}/>
    )
  )}
  />
);

export default PublicRoute;