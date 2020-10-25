import React from "react";
import Axios from "./Axios";
import "../styles/Login.css";
import { useFormik } from "formik";
import { Link } from "react-router-dom";
import { Input } from "semantic-ui-react";

// setting initial values for formik form
const initialValues = {
  projectName: "",
  password: "",
};

// validation function for formik
const validate = (values) => {
  let errors = {};
  /* if (!values.projectName) {
    errors.projectName = "This field cannot be empty";
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.projectName)) {
    errors.projectName = "Please enter valid projectName";
  } */

  if (!values.password) {
    errors.password = "This field cannot be empty";
  } else if (values.password.length < 6) {
    errors.password = "Access Code should be atleast 6 characters long";
  }
  return errors;
};

// functional component start here
function Login() {
  // formik form starts here
  const formik = useFormik({
    initialValues,
    validate,

    // onSubmit that passes values to backend api when form gets submitted
    onSubmit: (values) => {
      Axios.post("/user-signin-endpoint", values).then((res) => {
        //history.push("/tasks");
        console.log(res);
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
              <label className="label"> projectName* </label> <br />
              <Input
                name="projectName"
                type="text"
                placeholder="abc@example.com"
                className="input"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.projectName}
              />
              {formik.touched.projectName && formik.errors.projectName ? (
                <div className="error-div"> {formik.errors.projectName} </div>
              ) : null}
            </div>

            <div className="password">
              <label className="label"> Access Code* </label> <br />
              <Input
                name="password"
                type="password"
                placeholder="Minimum 6 digits integers"
                className="input"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.password}
              />
              {formik.touched.password && formik.errors.password ? (
                <div className="error-div"> {formik.errors.password} </div>
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
