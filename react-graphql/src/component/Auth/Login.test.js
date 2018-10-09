import React from "react";

import { configure, shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
configure({ adapter: new Adapter() });

import { Login, LoginForm } from "./Login";
const loginFormProps = {
  values: {
    email: "",
    password: ""
  },
  errors: {},
  touched: {},
  isSubmitting: false,
  isValidating: false,
  submitCount: 0,
  dirty: false,
  isValid: false,
  initialValues: {
    email: "",
    password: ""
  },
  validateOnChange: true,
  validateOnBlur: true
};

describe("Login", () => {
  it("Login should renders without crashing", () => {
    const component = shallow(<Login />);
    expect(component).toMatchSnapshot();
  });

  it("Login should contains title", () => {
    const component = shallow(<Login />);
    const title = <h1>Login</h1>;
    expect(component.contains(title)).toEqual(true);
  });

  it("Login should contains a Formik Tag", () => {
    const component = shallow(<Login />);
    expect(component.find("Formik")).toHaveLength(1);
  });

  it("Login should show error message", () => {
    const component = shallow(<Login state={{ errorMessage: "error!" }} />);
    expect(component.find(".snackbar.red")).toHaveLength(1);
  });

  it("LoginForm should renders without crashing", () => {
    const component = shallow(<LoginForm {...loginFormProps} />);
    expect(component).toMatchSnapshot();
  });

  it("LoginForm should contains a form tag", () => {
    const component = shallow(<LoginForm {...loginFormProps} />);
    expect(component.find("form")).toHaveLength(1);
  });

  it("LoginForm should contains two buttons", () => {
    const component = shallow(<LoginForm {...loginFormProps} />);
    expect(component.find("button")).toHaveLength(2);
  });

  it("LoginForm submit button disable when isSubmitting is true", () => {
    const component = shallow(<LoginForm {...loginFormProps} isSubmitting />);
    expect(component.find("button[type='submit']").props().disabled).toEqual(
      true
    );
  });

  it("LoginForm should contains a password field ", () => {
    const component = shallow(<LoginForm {...loginFormProps} />);
    expect(component.find("input[name='password']")).toHaveLength(1);
  });

  it("LoginForm should contains a email field ", () => {
    const component = shallow(<LoginForm {...loginFormProps} />);
    expect(component.find("input[name='email']")).toHaveLength(1);
  });

  it("LoginForm submit button should have text Login", () => {
    const component = shallow(<LoginForm {...loginFormProps} />);
    expect(component.find("button[type='submit']").text()).toEqual("Login");
  });
  it("LoginForm reset button should have text Reset", () => {
    const component = shallow(<LoginForm {...loginFormProps} />);
    expect(component.find("button[type='button']").text()).toEqual("Reset");
  });
});
