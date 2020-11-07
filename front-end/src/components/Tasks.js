import React, { useState, useEffect } from "react";
import Axios from "./Axios";
import "../styles/Tasks.css";
import { Link } from "react-router-dom";
import { Header, Modal, Input } from "semantic-ui-react";
import { Check, Plus } from "react-feather";
import { useFormik } from "formik";
import TaskCard from "./TaskCard";
import CompletedTask from "./CompletedTask";

// setting initial values for formik form
const initialValues = {};

// validation function for formik
const validate = (values) => {
  let errors = {};
  if (!values.taskName) {
    errors.taskName = "This field cannot be empty";
  }

  if (!values.assignee) {
    errors.assignee = "This field cannot be empty";
  }

  if (!values.startDate) {
    errors.startDate = "This field cannot be empty";
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
function Tasks() {
  // creating state for task data
  const [open, setOpen] = useState(false);
  const accessCodeData = "testAccessCode";

  const priorityOptions = [
    { key: 1, text: "Low", value: 1 },
    { key: 2, text: "Medium", value: 2 },
    { key: 3, text: "High", value: 3 },
  ];

  // formik form starts here
  const formik = useFormik({
    initialValues: {
      taskName: "",
      assignee: "",
      startDate: "",
      dueDate: "",
      priority: "",
      status: "",
      accessCode: accessCodeData,
    },
    validate,

    // onSubmit that passes values to backend api when form gets submitted
    onSubmit: (values) => {
      Axios.post("/task-endpoint", values).then((res) => {
        window.location.reload();
      });
    },
  });

  return (
    <div>
      <div style={{ display: "flex" }}>
        {/* left side menu div */}
        <div className="left-menu">
          <h1 className="left-menu-h1"> allRemote </h1>
          <ul className="ul-menu">
            <li className="active-ul-menu-li">
              <Link className="active-menu-link">Tasks</Link>
            </li>
            <li className="ul-menu-li">
              <Link to="/schedules" className="menu-links">
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
          <div className="top">
            <h2 style={{ marginLeft: "8px", color: "#343434" }}> Tasks </h2>

            {/* modal for create task form */}
            <Modal
              open={open}
              trigger={
                <button className="create-btn">
                  <Plus style={{ height: "16px" }} />
                  Create task
                </button>
              }
              onClose={() => setOpen(false)}
              onOpen={() => setOpen(true)}
            >
              <Header>
                <Plus style={{ height: "25px", paddingTop: "10px" }} />
                Create task
              </Header>
              <Modal.Content>
                {/* formik form that renders on front end */}
                <form onSubmit={formik.handleSubmit}>
                  <div>
                    <label className="label"> Task Name* </label> <br />
                    <Input
                      name="taskName"
                      type="text"
                      placeholder="Example: Designing task"
                      className="input"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.taskName}
                    />
                    {/* displays validations */}
                    {formik.touched.taskName && formik.errors.taskName ? (
                      <div className="error-div">
                        {" "}
                        {formik.errors.taskName}{" "}
                      </div>
                    ) : null}
                  </div>

                  <div className="next-input-field">
                    <label className="label"> Assignee* </label> <br />
                    <Input
                      name="assignee"
                      type="text"
                      placeholder="Example: abc@example.com"
                      className="input"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.assignee}
                    />
                    {formik.touched.assignee && formik.errors.assignee ? (
                      <div className="error-div">
                        {" "}
                        {formik.errors.assignee}{" "}
                      </div>
                    ) : null}
                  </div>

                  <div className="next-input-field">
                    <label className="label"> Start date* </label> <br />
                    <Input
                      name="startDate"
                      type="date"
                      className="input"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.startDate}
                    />
                    {formik.touched.startDate && formik.errors.startDate ? (
                      <div className="error-div">
                        {" "}
                        {formik.errors.startDate}{" "}
                      </div>
                    ) : null}
                  </div>

                  <div className="next-input-field">
                    <label className="label"> Due date* </label> <br />
                    <Input
                      name="dueDate"
                      type="date"
                      className="input"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.dueDate}
                    />
                    {formik.touched.dueDate && formik.errors.dueDate ? (
                      <div className="error-div"> {formik.errors.dueDate} </div>
                    ) : null}
                  </div>

                  <div className="next-input-field">
                    <label className="label"> Priority* </label> <br />
                    <Input
                      name="priority"
                      type="text"
                      placeholder="Example: High"
                      className="input"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.priority}
                    />
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
      </div>

      <div
        style={{
          display: "flex",
          justifyContent: "left",
          paddingBottom: "30px",
        }}
      >
        {/* ongoing tasks */}
        <h5 style={{ marginTop: "50px", marginLeft: "390px" }}>
          {" "}
          Ongoing Tasks{" "}
        </h5>

        <h5 style={{ marginTop: "50px", marginLeft: "420px" }}>
          {" "}
          Completed Tasks{" "}
        </h5>
      </div>
      <div style={{ display: "flex", justifyContent: "space-around" }}>
        {/* card that displays tasks */}
        <TaskCard />
        <CompletedTask />
      </div>
    </div>
  );
}

export default Tasks;
