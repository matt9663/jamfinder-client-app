import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import TokenService from '../services/token-service';

// component redirects a logged user to the dashboard if they try to access a public only route,
// such as the public landing page, register user page, or login page.

export default function PublicOnlyRoute({ component, ...props }) {
  const Component = component;
  return (
    <Route
      {...props}
      render={(componentProps) => (
        TokenService.hasAuthToken()
          ? <Redirect to="/dashboard" />
          : <Component {...componentProps} />
      )}
    />
  );
}
