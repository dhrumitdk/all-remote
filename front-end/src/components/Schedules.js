import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Header, Modal, Input } from "semantic-ui-react";
import { Plus } from "react-feather";
import { useFormik } from "formik";
import Axios from "./Axios";
import "../styles/Schedules.css";

// functional component start here
function Schedules() {
  const [scheduleData, setScheduleData] = useState([]);
  const [open, setOpen] = useState(false);
  const accessCodeData = "testAccessCode";

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

    return errors;
  };

  // useEffect hook for fetching data from the database
  useEffect(() => {
    async function fetchData() {
      const response = await Axios.get("/schedule-endpoint");
      setScheduleData(response.data);
      return response;
    }

    fetchData();
  }, []); // gets executed only once

  // formik form starts here
  const formik = useFormik({
    initialValues: {
      title: "",
      date: "",
      url: "",
      accessCode: accessCodeData,
    },
    validate,

    // onSubmit that passes values to backend api when form gets submitted
    onSubmit: (values) => {
      Axios.post("/schedule-endpoint", values).then((res) => {
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
                    type="date"
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
                    type="text"
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

      {/* card that displays schedules */}
      <div>
        {scheduleData.map(({ title, date, url }) => (
          <div className="schedule__card">
            <div>
              <b> {title} </b>
            </div>
            <div>
              {date} <br />
              {url}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Schedules;
