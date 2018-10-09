import React from "react";

import { configure, shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
configure({ adapter: new Adapter() });

import { SignUp, SignUpForm } from "./Signup";

const signupFormProps = {
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

describe("SignUp", () => {
  it("SignUp should renders without crashing", () => {
    const component = shallow(<SignUp />);
    // expect(component).toMatchSnapshot();
  });

  it("SignUp should contains title", () => {
    const component = shallow(<SignUp />);
    const title = <h1>Sign Up</h1>;
    expect(component.contains(title)).toEqual(true);
  });

  it("SignUp should contains a Formik Tag", () => {
    const component = shallow(<SignUp />);
    expect(component.find("Formik")).toHaveLength(1);
  });

  it("SignUp should show error message", () => {
    const component = shallow(<SignUp state={{ errorMessage: "error!" }} />);
    expect(component.find(".snackbar.red")).toHaveLength(1);
  });

  it("SignUpForm should renders without crashing", () => {
    const component = shallow(<SignUpForm {...signupFormProps} />);
    // expect(component).toMatchSnapshot();
  });

  it("SignUpForm should contains a form tag", () => {
    const component = shallow(<SignUpForm {...signupFormProps} />);
    expect(component.find("form")).toHaveLength(1);
  });

  it("SignUpForm should contains two buttons", () => {
    const component = shallow(<SignUpForm {...signupFormProps} />);
    expect(component.find("button")).toHaveLength(2);
  });

  it("SignUpForm submit button disable when isSubmitting is true", () => {
    const component = shallow(<SignUpForm {...signupFormProps} isSubmitting />);
    expect(component.find("button[type='submit']").props().disabled).toEqual(
      true
    );
  });

  it("SignUpForm should contains a password field ", () => {
    const component = shallow(<SignUpForm {...signupFormProps} />);
    expect(component.find("input[name='password']")).toHaveLength(1);
  });

  it("SignUpForm should contains a first name field ", () => {
    const component = shallow(<SignUpForm {...signupFormProps} />);
    expect(component.find("input[name='firstName']")).toHaveLength(1);
  });

  it("SignUpForm should contains a last name field ", () => {
    const component = shallow(<SignUpForm {...signupFormProps} />);
    expect(component.find("input[name='lastName']")).toHaveLength(1);
  });

  it("SignUpForm should contains a email field ", () => {
    const component = shallow(<SignUpForm {...signupFormProps} />);
    expect(component.find("input[name='email']")).toHaveLength(1);
  });

  it("SignUpForm submit button should have text Submit", () => {
    const component = shallow(<SignUpForm {...signupFormProps} />);
    expect(component.find("button[type='submit']").text()).toEqual("Submit");
  });

  it("SignUpForm reset button should have text Reset", () => {
    const component = shallow(<SignUpForm {...signupFormProps} />);
    expect(component.find("button[type='button']").text()).toEqual("Reset");
  });
});
