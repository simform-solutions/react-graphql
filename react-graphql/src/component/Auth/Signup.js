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
    label: "First Name",
    name: "firstName",
    type: "text"
  },
  {
    label: "Last Name",
    name: "lastName",
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
    .required("Password is required!"),
  firstName: yup.string().required("First Name is required!"),
  lastName: yup.string().required("Last Name is required!")
};

const initialValues = {
  email: "",
  password: "",
  firstName: "",
  lastName: ""
};

const SUBMIT_FORM = gql`
  mutation SubmitForm(
    $firstName: String!
    $lastName: String!
    $email: String!
    $password: String!
  ) {
    register(
      firstName: $firstName
      lastName: $lastName
      email: $email
      password: $password
    ) {
      firstName
      lastName
      email
      token
      message
    }
  }
`;

export const SignUpForm = ({
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
      Submit
    </button>
    <button type="button" className="btn btn-danger" onClick={handleReset}>
      Reset
    </button>
  </form>
);

export const SignUp = ({ onFormSubmit, state }) => (
  <div>
    <h1>Sign Up</h1>
    <Formik
      initialValues={initialValues}
      validationSchema={yup.object().shape(validation)}
      onSubmit={onFormSubmit}
      component={SignUpForm}
    />
    {state &&
      state.errorMessage && (
        <div className="snackbar show red">{state.errorMessage}</div>
      )}
  </div>
);

export default compose(
  withRouter,
  withState("state", "setState", {
    errorMessage: ""
  }),
  graphql(SUBMIT_FORM),
  withHandlers({
    onFormSubmit: ({ mutate, setState, history }) => async (
      values,
      { setSubmitting, resetForm }
    ) => {
      try {
        const  {data: {
          register: { firstName, lastName,token, message }
        }} = await mutate({
          variables: values
        });
        localStorage.setItem("session-token", token);
        localStorage.setItem(
          "message",
          message
        );
        resetForm(initialValues);
        setSubmitting(false);
        history.push("/");
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
)(SignUp);
