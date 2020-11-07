import { useFormik } from "formik";
import React, { useEffect, useState } from "react";
import Axios from "./Axios";
import { Plus, Share, Share2 } from "react-feather";
import { Link } from "react-router-dom";
import { Header, Input, Modal } from "semantic-ui-react";

// setting initial values for formik form
const initialValues = {
  email: "",
  accessCode: "",
};

// validation function for formik
const valiaccessCode = (values) => {
  let errors = {};
  if (!values.email) {
    errors.email = "This field cannot be empty";
  }

  if (!values.accessCode) {
    errors.accessCode = "This field cannot be empty";
  }

  if (!values.url) {
    errors.url = "This field cannot be empty";
  }

  return errors;
};

// functional component start here
function Teams() {
  const [open, setOpen] = useState(false);
  const [teamData, setTeamData] = useState([]);

  // useEffect hook for fetching data from the database
  useEffect(() => {
    async function fetchData() {
      const response = await Axios.get("/invitation-endpoint");
      setTeamData(response.data);

      return response;
    }

    fetchData();
  }, []); // gets executed only once

  // formik form starts here
  const formik = useFormik({
    initialValues,
    valiaccessCode,

    // onSubmit that passes values to backend api when form gets submitted
    onSubmit: (values) => {
      Axios.post("/invitation-endpoint", values).then((res) => {
        window.location.reload();
      });
    },
  });

  return (
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
          <li className="ul-menu-li">
            <Link to="/schedules" className="menu-links">
              Schedules
            </Link>
          </li>
          <li className="active-ul-menu-li">
            <Link to="/teams" className="active-menu-link">
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
        <h2> Your Team </h2>
        {/* modal for invite team member form */}
        <Modal
          open={open}
          trigger={
            <button style={{ width: "130px" }} className="create-btn">
              <Share style={{ height: "16px" }} />
              Send invitation
            </button>
          }
          onClose={() => setOpen(false)}
          onOpen={() => setOpen(true)}
        >
          <Header>
            <Share style={{ height: "16px" }} />
            Send invitation
          </Header>
          <Modal.Content>
            {/* formik form that renders on front end */}
            <form onSubmit={formik.handleSubmit}>
              <div>
                <label className="label"> Email* </label> <br />
                <Input
                  name="email"
                  type="text"
                  placeholder="Example: John@abc.com"
                  className="input"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.email}
                />
                {/* displays validations */}
                {formik.touched.email && formik.errors.email ? (
                  <div className="error-div"> {formik.errors.email} </div>
                ) : null}
              </div>

              <div className="next-input-field">
                <label className="label"> Access Code* </label> <br />
                <Input
                  name="accessCode"
                  type="password"
                  className="input"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.accessCode}
                />
                {formik.touched.accessCode && formik.errors.accessCode ? (
                  <div className="error-div"> {formik.errors.accessCode} </div>
                ) : null}
              </div>

              <div className="create-task">
                <button
                  className="create-form-btn"
                  type="submit"
                  onClick={() => window.location.reload()} // reloads page on button click
                >
                  Invite
                </button>
                &nbsp;&nbsp;
                <Link onClick={() => setOpen(false)}> Cancel </Link>
              </div>
            </form>
          </Modal.Content>
        </Modal>
      </div>

      <div style={{ marginTop: "160px", padding: "0", marginLeft: "-130px" }}>
        {teamData.map(({ email }) => (
          <div>
            <div style={{ marginTop: "20px" }}>
              <b> {email} </b>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Teams;
