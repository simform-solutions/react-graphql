import React from "react";
import { Route, Switch } from "react-router-dom";
import Private from "./component/Private/Private";
import Login from "./component/Auth/Login";
import SignUp from "./component/Auth/Signup";
import Home from "./component/Home/Home";

export const Routes = () => {
  return (
    <Switch>
      <Private exact path="/" component={Home} />
      <Route exact path="/signup" component={SignUp} />
      <Route exact path="/login" component={Login} />
    </Switch>
  );
};
export default Routes;
