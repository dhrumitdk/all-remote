import Axios from "./Axios";
import { useFormik } from "formik";
import React from "react";
import { Link, useHistory } from "react-router-dom";
import { Input } from "semantic-ui-react";
import { useStateValue } from "../StateProvider";

// validation function for formik
const validate = (values) => {
  let errors = {};

  if (!values.title) {
    errors.title = "This field cannot be empty";
  }

  if (!values.date) {
    errors.date = "This field cannot be empty";
  }

  return errors;
};

function CreateSchedules() {
  const history = useHistory();
  const [{ accessCodeState }] = useStateValue();

  // formik form starts here
  const formik = useFormik({
    initialValues: {
      title: "",
      date: "",
      url: "",
      accessCode: accessCodeState,
    },
    validate,
    onSubmit: (values) => {
      Axios.post("/api/schedules", values).then((res) => {
        history.push("/schedules");
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
          Create Schedule
        </p>

        <form onSubmit={formik.handleSubmit}>
          {/* div for schedule Title */}
          <div>
            <label className="label"> Title* </label> <br />
            <Input
              name="title"
              type="text"
              placeholder="Test Schedule"
              className="input"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.title}
            />
            {/* displays validations */}
            {formik.touched.title && formik.errors.title ? (
              <div className="error-div"> {formik.errors.title} </div>
            ) : null}
          </div>

          {/* div for date of the schedule */}
          <div style={{ marginTop: "10px" }}>
            <label className="label"> Date* </label> <br />
            <Input
              name="date"
              type="date"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.date}
            />
            {/* displays validations */}
            {formik.touched.date && formik.errors.date ? (
              <div className="error-div"> {formik.errors.date} </div>
            ) : null}
          </div>

          {/* div for url of the schedule */}
          <div style={{ marginTop: "10px" }}>
            <label className="label"> URL (Optional) </label> <br />
            <Input
              name="url"
              type="text"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.url}
            />
          </div>

          {/* div for create button */}
          <div
            style={{ marginTop: "30px", display: "flex", alignItems: "center" }}
          >
            <button className="share-thoughts-btn">Create</button>
            <Link style={{ marginLeft: "20px" }} to="/schedules">
              Cancel
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}

export default CreateSchedules;
