import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Header, Modal, Input } from "semantic-ui-react";
import { Plus } from "react-feather";
import { useFormik } from "formik";

// setting initial values for formik form
const initialValues = {
  title: "",
  date: "",
  url: "",
  dueDate: "",
  priority: "",
  status: "",
};

// validation function for formik
const validate = (values) => {
  let errors = {};
  if (!values.title) {
    errors.title = "This field cannot be empty";
  }

  if (!values.date) {
    errors.date = "This field cannot be empty";
  }

  if (!values.url) {
    errors.url = "This field cannot be empty";
  }

  if (!values.dueDate) {
    errors.dueDate = "This field cannot be empty";
  }

  if (!values.priority) {
    errors.priority = "This field cannot be empty";
  }
  return errors;
};

// functional component start here
function Schedules() {
  const [open, setOpen] = useState(false);

  // formik form starts here
  const formik = useFormik({
    initialValues,
    validate,

    // onSubmit that passes values to backend api when form gets submitted
    onSubmit: (values) => {
      window.location.reload();
    },
  });

  return (
    <div>
      <div style={{ display: "flex" }}>
        {/* left side menu div */}
        <div className="left-menu">
          <h1 className="left-menu-h1"> allRemote </h1>
          <ul className="ul-menu">
            <li className="ul-menu-li">
              <Link to="/tasks" className="menu-links">
                Tasks
              </Link>
            </li>
            <li className="active-ul-menu-li">
              <Link to="/scheules" className="active-menu-link">
                Schedules
              </Link>
            </li>
            <li className="ul-menu-li">
              <Link to="/teams" className="menu-links">
                Teams
              </Link>
            </li>
            <li className="ul-menu-li">
              <Link to="/wall" className="menu-links">
                Wall
              </Link>
            </li>
          </ul>
        </div>

        {/* right side menu div */}
        <div className="right-portion">
          <h2> Your Schedules </h2>
          {/* modal for create schedule form */}
          <Modal
            open={open}
            trigger={
              <button style={{ width: "130px" }} className="create-btn">
                <Plus style={{ height: "16px" }} />
                Create schedule
              </button>
            }
            onClose={() => setOpen(false)}
            onOpen={() => setOpen(true)}
          >
            <Header>
              <Plus style={{ height: "25px", paddingTop: "10px" }} />
              Create schedule
            </Header>
            <Modal.Content>
              {/* formik form that renders on front end */}
              <form onSubmit={formik.handleSubmit}>
                <div>
                  <label className="label"> Title* </label> <br />
                  <Input
                    name="title"
                    type="text"
                    placeholder="Example: Designing task"
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

                <div className="next-input-field">
                  <label className="label"> Date* </label> <br />
                  <Input
                    name="date"
                    type="text"
                    placeholder="Example: abc@example.com"
                    className="input"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.date}
                  />
                  {formik.touched.date && formik.errors.date ? (
                    <div className="error-div"> {formik.errors.date} </div>
                  ) : null}
                </div>

                <div className="next-input-field">
                  <label className="label"> URL (Optional) </label> <br />
                  <Input
                    name="url"
                    type="date"
                    className="input"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.url}
                  />
                  {formik.touched.url && formik.errors.url ? (
                    <div className="error-div"> {formik.errors.url} </div>
                  ) : null}
                </div>
                <div className="create-task">
                  <button
                    className="create-form-btn"
                    type="submit"
                    onClick={() => window.location.reload()} // reloads page on button click
                  >
                    Create
                  </button>
                  &nbsp;&nbsp;
                  <Link onClick={() => setOpen(false)}> Cancel </Link>
                </div>
              </form>
            </Modal.Content>
          </Modal>
        </div>
      </div>

      {/* schedule cards */}
      <div style={{ display: "flex", marginTop: "50px", marginLeft: "350px" }}>
        <div className="schedule-div">
          <div style={{ backgroundColor: "#f1f1f1" }} className="task-card">
            <div style={{ display: "flex" }}>
              <b> Title: </b> &nbsp; Test Meeting
            </div>
            <div style={{ marginTop: "15px" }}>
              <b> Date: </b> &nbsp; 03/10/2020
              <br />
              <b> url (optional): </b> <br />
              www.testmeeting.com
            </div>
          </div>
        </div>

        <div className="schedule-div">
          <div style={{ backgroundColor: "#f1f1f1" }} className="task-card">
            <div style={{ display: "flex" }}>
              <b> Title: </b> &nbsp; Test Meeting
            </div>
            <div style={{ marginTop: "15px" }}>
              <b> Date: </b> &nbsp; 03/10/2020
              <br />
              <b> url (optional): </b> <br />
              www.testmeeting.com
            </div>
          </div>
        </div>

        <div className="schedule-div">
          <div style={{ backgroundColor: "#f1f1f1" }} className="task-card">
            <div style={{ display: "flex" }}>
              <b> Title: </b> &nbsp; Test Meeting
            </div>
            <div style={{ marginTop: "15px" }}>
              <b> Date: </b> &nbsp; 03/10/2020
              <br />
              <b> url (optional): </b> <br />
              www.testmeeting.com
            </div>
          </div>
        </div>

        <div className="schedule-div">
          <div style={{ backgroundColor: "#f1f1f1" }} className="task-card">
            <div style={{ display: "flex" }}>
              <b> Title: </b> &nbsp; Test Meeting
            </div>
            <div style={{ marginTop: "15px" }}>
              <b> Date: </b> &nbsp; 03/10/2020
              <br />
              <b> url (optional): </b> <br />
              www.testmeeting.com
            </div>
          </div>
        </div>
      </div>
      <br />

      <div style={{ marginLeft: "350px" }} className="schedule-div">
        <div style={{ backgroundColor: "#f1f1f1" }} className="task-card">
          <div style={{ display: "flex" }}>
            <b> Title: </b> &nbsp; Test Meeting
          </div>
          <div style={{ marginTop: "15px" }}>
            <b> Date: </b> &nbsp; 03/10/2020
            <br />
            <b> url (optional): </b> <br />
            www.testmeeting.com
          </div>
        </div>
      </div>
    </div>
  );
}

export default Schedules;
