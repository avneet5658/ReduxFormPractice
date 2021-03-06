import React from "react";
import { useState } from "react";
import { connect } from "react-redux";
import { Field, reduxForm } from "redux-form";
import Display from "./Display";

const MainComponents = (props) => {
  console.log(props.form);
  const { handleSubmit, reset, valid } = props;
  const [valuess, setValuess] = useState(false);

  const renderText = (props) => (
    <div className="form-group col-md-12">
      <label className="form-label">{props.label} : </label>
      <input {...props.input} type={props.type} classname="form-control" />
      <br />
      {props.meta.touched && props.meta.error && <div>{props.meta.error}</div>}
    </div>
  );
  const onSubmit = () => {
    setValuess(true);
  };
  return (
    <div className="container">
      <h1>Registration Form</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <div>
            <Field
              component={renderText}
              type="text"
              name="name"
              label="Name"
            />
          </div>
          <div className="form-group">
            <Field
              component={renderText}
              type="email"
              name="email"
              label="Email"
            />
          </div>
          <div className="form-group">
            <Field
              component={renderText}
              type="number"
              name="contact"
              label="Contact"
            />
          </div>
          <div className="form-group">
            <Field
              component={renderText}
              type="text"
              name="username"
              label="Username"
            />
          </div>
          <div className="form-group">
            <Field
              type="password"
              name="password"
              component={renderText}
              label="Password"
            />
          </div>
        </div>
        <button disabled={!valid} className="btn btn-danger">
          Submit
        </button>
        &nbsp;
        <button
          disabled={!valid}
          className="btn btn-warning"
          type="button"
          onClick={reset}
        >
          Reset
        </button>
      </form>
      {valuess ? <Display /> : null}
    </div>
  );
};

const validate = (values) => {
  // console.log(props);
  // console.log(values);
  const error = {};

  let letters = /^[0-9a-zA-Z]+$/g;
  let smallalpha = /[a-z]/g;
  let capalpha = /[A-Z]/g;
  let specialchars = /\W/;

  let alphabets = /^[A-Za-z_ ]+$/;
  let contactno = /^\d{10}$/;

  if (!values.name) {
    error.name = "Name Field is required";
  } else if (!values.name.match(alphabets)) {
    error.name = "Name must contain only alphabets";
  }
  if (!values.email) {
    error.email = "Email is required";
  }
  if (!values.contact) {
    error.contact = "Contact field is required";
  } else if (!values.contact.match(contactno)) {
    error.contact = "Contact no must be of 10 digits";
  }
  if (!values.username) {
    error.username = "Username is required";
  } else if (!values.username.match(letters)) {
    error.username = "Username must be alphanumeric";
  }
  if (!values.password) {
    error.password = "Password is required";
  } else if (!values.password.match(smallalpha)) {
    error.password = "Pasword must contain atleast one small alphabets";
  } else if (!values.password.match(capalpha)) {
    error.password = "Pasword must contain atleast one capital alphabets";
  } else if (!values.password.match(specialchars)) {
    error.password = "Pasword must contain atleast one special alphabets";
  } else if (values.password.length < 8) {
    error.password = "Length of the password must greater than 8";
  }
  return error;
};

export default reduxForm({
  form: "contact", // a unique name for this form
  validate: validate,
})(MainComponents);
