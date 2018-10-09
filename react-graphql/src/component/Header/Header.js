import React from "react";
import { withRouter } from "react-router-dom";
import { compose, withHandlers } from "recompose";

const Header = props => {
  const token = localStorage.getItem("session-token");
  return (
    <header className="header-main">
      {!token && (
        <div className="btn-margin">
          <button
            type="button"
            className="btn btn-primary"
            onClick={props.onSignUp}
          >
            Sign Up
          </button>
        </div>
      )}
      {!token && (
        <div className="btn-margin">
          <button
            type="button"
            className="btn btn-primary"
            onClick={props.onLogin}
          >
            Login
          </button>
        </div>
      )}
      {token && (
        <div className="btn-margin">
          <button
            type="button"
            className="btn btn-primary"
            onClick={props.onLogout}
          >
            Logout
          </button>
        </div>
      )}
    </header>
  );
};
export default compose(
  withRouter,
  withHandlers({
    onLogout: props => event => {
      localStorage.removeItem("session-token");
      localStorage.removeItem("full-name");
      props.history.push("/");
    },
    onLogin: props => event => {
      props.history.push("/login");
    },
    onSignUp: props => event => {
      props.history.push("/signup");
    }
  })
)(Header);
