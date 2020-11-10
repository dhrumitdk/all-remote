import Axios from "./Axios";
import { useFormik } from "formik";
import React from "react";
import { Link, useHistory } from "react-router-dom";
import { Input } from "semantic-ui-react";
import { useStateValue } from "../StateProvider";

// validation function for formik
const validate = (values) => {
  let errors = {};

  if (!values.taskName) {
    errors.taskName = "This field cannot be empty";
  }

  if (!values.assignee) {
    errors.assignee = "This field cannot be empty";
  } else if (
    !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.assignee)
  ) {
    errors.assignee = "Please enter valid email";
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

function CreateTasks() {
  const history = useHistory();
  const [{ accessCodeState }] = useStateValue();

  // formik form starts here
  const formik = useFormik({
    initialValues: {
      taskName: "",
      assignee: "",
      startDate: "",
      dueDate: "",
      priority: "",
      status: "",
      accessCode: accessCodeState,
    },
    validate,
    onSubmit: (values) => {
      Axios.post("/api/tasks", values).then((res) => {
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

      <div style={{ marginTop: "50px", marginLeft: "50px" }}>
        <p
          style={{
            fontSize: "24px",
            fontFamily: "Source Sans Pro",
            color: "#343434",
          }}
        >
          Create Task
        </p>

        <form onSubmit={formik.handleSubmit}>
          {/* div for taskName */}
          <div>
            <label className="label"> Task Name* </label> <br />
            <Input
              name="taskName"
              type="text"
              placeholder="Test Task"
              className="input"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.taskName}
            />
            {/* displays validations */}
            {formik.touched.taskName && formik.errors.taskName ? (
              <div className="error-div"> {formik.errors.taskName} </div>
            ) : null}
          </div>

          {/* div for Assignee */}
          <div>
            <label className="label"> Assignee* </label> <br />
            <Input
              name="assignee"
              type="text"
              placeholder="abc@gmail.com"
              className="input"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.assignee}
            />
            {/* displays validations */}
            {formik.touched.assignee && formik.errors.assignee ? (
              <div className="error-div"> {formik.errors.assignee} </div>
            ) : null}
          </div>

          {/* div for startDate of the schedule */}
          <div style={{ marginTop: "10px" }}>
            <label className="label"> Start Date* </label> <br />
            <Input
              name="startDate"
              type="date"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.startDate}
            />
            {/* displays validations */}
            {formik.touched.startDate && formik.errors.startDate ? (
              <div className="error-div"> {formik.errors.startDate} </div>
            ) : null}
          </div>

          {/* div for dueDate of the schedule */}
          <div style={{ marginTop: "10px" }}>
            <label className="label"> Due Date* </label> <br />
            <Input
              name="dueDate"
              type="date"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.dueDate}
            />
            {/* displays validations */}
            {formik.touched.dueDate && formik.errors.dueDate ? (
              <div className="error-div"> {formik.errors.dueDate} </div>
            ) : null}
          </div>

          {/* div for url of the schedule */}
          <div style={{ marginTop: "10px" }}>
            <label className="label"> Priority </label> <br />
            <Input
              name="priority"
              type="text"
              placeholder="High, Low or Medium"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.priority}
            />
            {/* displays validations */}
            {formik.touched.priority && formik.errors.priority ? (
              <div className="error-div"> {formik.errors.priority} </div>
            ) : null}
          </div>

          {/* div for create button */}
          <div
            style={{ marginTop: "30px", display: "flex", alignItems: "center" }}
          >
            <button className="share-thoughts-btn">Create</button>
            <Link style={{ marginLeft: "20px" }} to="/tasks">
              Cancel
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}

export default CreateTasks;
