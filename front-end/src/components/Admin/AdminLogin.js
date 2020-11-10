import React from "react";
import { useFormik } from "formik";
import { Input } from "semantic-ui-react";
import { useHistory } from "react-router-dom";

// setting initial values for formik form
const initialValues = {
  email: "",
  password: "",
};

// validation function for formik
const validate = (values) => {
  let errors = {};
  if (!values.email) {
    errors.email = "This field cannot be empty";
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = "Please enter valid email";
  }

  if (!values.password) {
    errors.password = "This field cannot be empty";
  } else if (values.password.length < 6) {
    errors.password = "Access Code should be atleast 6 characters long";
  }
  return errors;
};

function AdminLogin() {
  const history = useHistory();
  // formik form starts here
  const formik = useFormik({
    initialValues,
    validate,
    onSubmit: (values) => {
      if (
        values.email === "dhrumit.dk@gmail.com" &&
        values.password === "admin@123"
      ) {
        history.push("/admin/dashboard");
      } else {
        alert("Oops! Wrong credentials");
      }
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
          <p className="p">You're in control!</p>
        </div>
      </div>

      {/* formik form that renders on front end */}
      <div className="form">
        <div className="form-inner">
          <form onSubmit={formik.handleSubmit}>
            <div>
              <label className="label"> Admin Email* </label> <br />
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

            <div className="password">
              <label className="label"> Admin Password* </label> <br />
              <Input
                name="password"
                type="password"
                placeholder="Your password here"
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
        </div>
      </div>

      {/* footer */}
      <footer>
        <pre> Designed & developed by Heet and Dhrumit </pre>
      </footer>
    </div>
  );
}

export default AdminLogin;
