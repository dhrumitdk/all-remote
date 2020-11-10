import Axios from "./Axios";
import { useFormik } from "formik";
import React from "react";
import { Link, useHistory } from "react-router-dom";
import { Input } from "semantic-ui-react";
import { useStateValue } from "../StateProvider";

// validation function for formik
const validate = (values) => {
  let errors = {};

  if (!values.name) {
    errors.name = "This field cannot be empty";
  }

  if (!values.designation) {
    errors.designation = "This field cannot be empty";
  }

  if (!values.email) {
    errors.email = "This field cannot be empty";
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = "Please enter valid email";
  }

  if (!values.location) {
    errors.location = "This field cannot be empty";
  }

  if (!values.accessCode) {
    errors.accessCode = "This field cannot be empty";
  } else if (values.accessCode.length < 6) {
    errors.accessCode = "Access Code should be atleast 6 characters long";
  }

  return errors;
};

function SendInvitations() {
  const history = useHistory();
  const [{ accessCodeState }] = useStateValue();

  // formik form starts here
  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      designation: "",
      location: "",
      accessCode: "",
    },
    validate,
    onSubmit: (values) => {
      Axios.post("/api/invitations", values).then((res) => {
        if (values.accessCode === accessCodeState) history.push("/teams");
        else alert("OOPS! Access Code doesn't match!");
      });
    },
  });

  return (
    <div>
      {/* header */}
      <div className="header-div">
        <h1 className="h1"> allRemote </h1>
      </div>

      <div style={{ marginTop: "50px", marginLeft: "50px" }}>
        <p
          style={{
            fontSize: "24px",
            fontFamily: "Source Sans Pro",
            color: "#343434",
          }}
        >
          Invite
        </p>

        <form onSubmit={formik.handleSubmit}>
          {/* div for name */}
          <div>
            <label className="label"> Full Name* </label> <br />
            <Input
              name="name"
              type="text"
              placeholder="John Doe"
              className="input"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.name}
            />
            {/* displays validations */}
            {formik.touched.name && formik.errors.name ? (
              <div className="error-div"> {formik.errors.name} </div>
            ) : null}
          </div>

          {/* div for email */}
          <div style={{ marginTop: "10px" }}>
            <label className="label"> Email* </label> <br />
            <Input
              name="email"
              type="text"
              placeholder="abc@gmail.com"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.email}
            />
            {/* displays validations */}
            {formik.touched.email && formik.errors.email ? (
              <div className="error-div"> {formik.errors.email} </div>
            ) : null}
          </div>

          {/* div for designation */}
          <div style={{ marginTop: "10px" }}>
            <label className="label"> Designation* </label> <br />
            <Input
              name="designation"
              type="text"
              placeholder="Front End Developer"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.designation}
            />
            {/* displays validations */}
            {formik.touched.designation && formik.errors.designation ? (
              <div className="error-div"> {formik.errors.designation} </div>
            ) : null}
          </div>

          {/* div for location */}
          <div style={{ marginTop: "10px" }}>
            <label className="label"> Location* </label> <br />
            <Input
              name="location"
              type="text"
              placeholder="Ahmedabad, India"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.location}
            />
            {/* displays validations */}
            {formik.touched.location && formik.errors.location ? (
              <div className="error-div"> {formik.errors.location} </div>
            ) : null}
          </div>

          {/* div for accessCode */}
          <div style={{ marginTop: "10px" }}>
            <label className="label"> Access Code* </label> <br />
            <Input
              name="accessCode"
              type="password"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.accessCode}
            />
            {/* displays validations */}
            {formik.touched.accessCode && formik.errors.accessCode ? (
              <div className="error-div"> {formik.errors.accessCode} </div>
            ) : null}
          </div>

          {/* div for create button */}
          <div
            style={{ marginTop: "30px", display: "flex", alignItems: "center" }}
          >
            <button className="share-thoughts-btn">Create</button>
            <Link style={{ marginLeft: "20px" }} to="/teams">
              Cancel
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}

export default SendInvitations;
