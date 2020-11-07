import React from "react";
import Axios from "./Axios";
import "../styles/Login.css";
import { useFormik } from "formik";
import { Link, useHistory } from "react-router-dom";
import { Input } from "semantic-ui-react";

// setting initial values for formik form
const initialValues = {
  email: "",
  accessCode: "",
};

// validation function for formik
const validate = (values) => {
  let errors = {};
  /* if (!values.email) {
    errors.email = "This field cannot be empty";
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = "Please enter valid email";
  } */

  if (!values.accessCode) {
    errors.accessCode = "This field cannot be empty";
  } else if (values.accessCode.length < 6) {
    errors.accessCode = "Access Code should be atleast 6 characters long";
  }
  return errors;
};

// functional component start here
function Login() {
  const history = useHistory();
  // formik form starts here
  const formik = useFormik({
    initialValues,
    validate,

    // onSubmit that passes values to backend api when form gets submitted
    onSubmit: (values) => {
      Axios.post("/user-signin-endpoint", values).then((res) => {
        if (res.status === 200) {
          history.push("/tasks");
        } else {
          alert("Invalid Credentials!");
        }
      });
    },
  });

  return (
    <div>
      {/* header */}
      <div className="header">
        <h1 className="h1"> allRemote </h1>
      </div>

      <div className="body">
        <div className="inner">
          <p className="p">
            Where working remote <br /> feels breeze
          </p>
        </div>
      </div>

      {/* formik form that renders on front end */}
      <div className="form">
        <div className="form-inner">
          <form onSubmit={formik.handleSubmit}>
            <div>
              <label className="label"> Email* </label> <br />
              <Input
                name="email"
                type="text"
                placeholder="abc@example.com"
                className="input"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.email}
              />
              {formik.touched.email && formik.errors.email ? (
                <div className="error-div"> {formik.errors.email} </div>
              ) : null}
            </div>

            <div className="accessCode">
              <label className="label"> Access Code* </label> <br />
              <Input
                name="accessCode"
                type="password"
                placeholder="Minimum 6 digits integers"
                className="input"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.accessCode}
              />
              {formik.touched.accessCode && formik.errors.accessCode ? (
                <div className="error-div"> {formik.errors.accessCode} </div>
              ) : null}
            </div>

            <div className="btn">
              <button className=".button" type="submit">
                Login
              </button>
            </div>
          </form>
          <div className="signup-link">
            <Link to="/"> Want to create project? </Link>
          </div>
        </div>
      </div>

      {/* footer */}
      <footer>
        <pre> Designed & developed by Heet and Dhrumit </pre>
      </footer>
    </div>
  );
}

export default Login;
