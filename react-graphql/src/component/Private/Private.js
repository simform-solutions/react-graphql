import React from "react";
import { Route, Redirect } from "react-router-dom";
const Private = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props => {
      if (!localStorage.getItem("session-token")) {
        return (
          <Redirect
            to={{
              pathname: "/login"
            }}
          />
        );
      } else {
        return <Component {...props} />;
      }
    }}
  />
);
export default Private;
