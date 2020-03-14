import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import TokenService from '../services/token-service';


// component redirects unlogged users to the login page if they try to access a non public route
export default function PrivateRoute({ component, ...props }) {
  const Component = component;
  return (
    <Route
      {...props}
      render={(componentProps) => (
        TokenService.hasAuthToken()
          ? <Component {...componentProps}/>
          : <Redirect
            to={{
              pathname: '/login',
              state: { from: componentProps.location }
            }}
            />
      )}
    />
  );
}
