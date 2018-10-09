import React from "react";
import { Formik } from "formik";
import * as yup from "yup";
import { graphql } from "react-apollo";
import gql from "graphql-tag";
import { compose, withState, withHandlers } from "recompose";
import { withRouter } from "react-router-dom";

const fields = [
  {
    label: "Email",
    name: "email",
    type: "text"
  },
  {
    label: "Password",
    name: "password",
    type: "password"
  }
];
const validation = {
  email: yup
    .string()
    .email("E-mail is not valid!")
    .required("E-mail is required!"),
  password: yup
    .string()
    .min(5)
    .required("Password is required!")
};

const initialValues = {
  email: "",
  password: ""
};

const LOGIN = gql`
  mutation SubmitForm($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      email
      firstName
      lastName,
      token,
      message
    }
  }
`;

export const LoginForm = ({
  values,
  touched,
  errors,
  isSubmitting,
  handleChange,
  handleBlur,
  handleSubmit,
  handleReset
}) => (
  <form onSubmit={handleSubmit}>
    {fields.map(({ label, name, type }) => {
      return (
        <div key={name} className="form-group row">
          <label className="col-sm-2 col-form-label">{label}</label>
          <div className="col-sm-10">
            <input
              name={name}
              type={type}
              className={`form-control ${errors[name] &&
                touched[name] &&
                "is-invalid"}`}
              value={values[name]}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            {errors[name] &&
              touched[name] && (
                <div className="invalid-feedback">{errors[name]}</div>
              )}
          </div>
        </div>
      );
    })}
    <button
      disabled={isSubmitting}
      type="submit"
      className="btn btn-primary"
      style={{ marginRight: "10px" }}
    >
      Login
    </button>
    <button type="button" className="btn btn-danger" onClick={handleReset}>
      Reset
    </button>
  </form>
);

export const Login = ({ state, onFormSubmit }) => (
  <div>
    <h1>Login</h1>
    <Formik
      initialValues={initialValues}
      validationSchema={yup.object().shape(validation)}
      onSubmit={onFormSubmit}
      component={LoginForm}
    />
    {state &&
      state.errorMessage && (
        <div className="snackbar show red">{state.errorMessage}</div>
      )}
  </div>
);

export default compose(
  withState("state", "setState", {
    errorMessage: ""
  }),
  graphql(LOGIN),
  withRouter,
  withHandlers({
    onFormSubmit: ({ mutate, setState, history }) => async (
      values,
      { setSubmitting, resetForm }
    ) => {
      try {
        const  {data: {
          login: { firstName, lastName,token, message }
        }} = await mutate({
          variables: values
        });
        localStorage.setItem("session-token", token);
        localStorage.setItem("message", message);
        setSubmitting(false);
        if (firstName) {
          resetForm(initialValues);
          history.push("/");
        } else {
          setState(state => ({
            ...state,
            errorMessage: "Invalid Credentials"
          }));
          setTimeout(() => {
            setState(state => ({
              ...state,
              errorMessage: ""
            }));
          }, 3000);
        }
      } catch (err) {
        setSubmitting(false);
        setState(state => ({
          ...state,
          errorMessage: err.message
        }));
        setTimeout(() => {
          setState(state => ({
            ...state,
            errorMessage: ""
          }));
        }, 3000);
      }
    }
  })
)(Login);
