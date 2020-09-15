import React from "react";
import axios from "axios";
import "../styles/SignUp.css";
import { useHistory } from "react-router-dom";
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
  if (!values.projectName) {
    errors.projectName = "This field cannot be empty";
  }

  if (!values.password) {
    errors.password = "This field cannot be empty";
  } else if (values.password.length < 6) {
    errors.password = "Access Code should be atleast 6 characters long";
  }
  return errors;
};

// functional component start here
function Signup() {
  const history = useHistory();

  // formik form starts here
  const formik = useFormik({
    initialValues,
    validate,

    // onSubmit that passes values to backend api when form gets submitted
    onSubmit: (values) => {
      axios
        .post("http://localhost:4000/user-signup-endpoint", values)
        .then((res) => {
          history.push("/tasks");
        });
    },
  });

  return (
    <div>
      {/* header */}
      <div className="header-div">
        <h1 className="h1"> allRemote </h1>
      </div>

      <div className="body-div">
        <div className="inner-div">
          <p className="p">
            Where working remote <br /> feels breeze
          </p>
        </div>
      </div>

      {/* formik form that renders on front end */}
      <div className="form-div">
        <div className="form-inner-div">
          <form onSubmit={formik.handleSubmit}>
            <div>
              <label className="label"> Project Name* </label> <br />
              <Input
                name="projectName"
                type="text"
                placeholder="Example: Demo Project"
                className="input"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.projectName}
              />
              {formik.touched.projectName && formik.errors.projectName ? (
                <div className="error-div"> {formik.errors.projectName} </div>
              ) : null}
            </div>

            <div className="accesscode-div">
              <label className="label"> Access Code* </label> <br />
              <Input
                name="password"
                type="password"
                placeholder="Minimum 6 digits integers"
                className="input"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.accessCode}
              />
              {formik.touched.password && formik.errors.password ? (
                <div className="error-div"> {formik.errors.password} </div>
              ) : null}
            </div>

            <div className="btn-div">
              <button type="submit">Create project</button>
            </div>
          </form>
          <div className="login-link">
            <Link to="/login"> Already have access code? </Link>
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

export default Signup;
