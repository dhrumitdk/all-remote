import React, { useState } from "react";
import { Header, Modal } from "semantic-ui-react";
import { Link } from "react-router-dom";
import "../../styles/Dashboard.css";
import { Edit, Trash, Trash2 } from "react-feather";

function Dashboard() {
  const [open, setOpen] = useState(false);
  return (
    <div>
      {/* header */}
      <h1 className="header-h1"> allRemote </h1>

      <div className="projects-div">
        <p style={{ fontSize: "34px", color: "#343434" }}> Projects </p>
      </div>

      {/* Project Names */}
      <div className="project-div">
        <div className="project-name-div">
          <Modal
            open={open}
            trigger={
              <Link
                style={{
                  color: "#343434",
                  fontFamily: "Source Sans Pro",
                  fontSize: "16px",
                  fontWeight: "500",
                }}
              >
                Test Project 1
              </Link>
            }
            onClose={() => setOpen(false)}
            onOpen={() => setOpen(true)}
          >
            <Header>Test Project </Header>
          </Modal>
        </div>

        <div style={{ marginTop: "10px" }} className="project-name-div">
          <Modal
            open={open}
            trigger={
              <Link
                style={{
                  color: "#343434",
                  fontFamily: "Source Sans Pro",
                  fontSize: "16px",
                  fontWeight: "500",
                }}
              >
                Test Project 2
              </Link>
            }
            onClose={() => setOpen(false)}
            onOpen={() => setOpen(true)}
          >
            <Header>Test Project</Header>
          </Modal>
        </div>

        <div style={{ marginTop: "10px" }} className="project-name-div">
          <Modal
            open={open}
            trigger={
              <Link
                style={{
                  color: "#343434",
                  fontFamily: "Source Sans Pro",
                  fontSize: "16px",
                  fontWeight: "500",
                }}
              >
                Test Project 3
              </Link>
            }
            onClose={() => setOpen(false)}
            onOpen={() => setOpen(true)}
          >
            <Header>Test Project</Header>
          </Modal>
        </div>

        <div style={{ marginTop: "10px" }} className="project-name-div">
          <Modal
            open={open}
            trigger={
              <Link
                style={{
                  color: "#343434",
                  fontFamily: "Source Sans Pro",
                  fontSize: "16px",
                  fontWeight: "500",
                }}
              >
                Test Project 4
              </Link>
            }
            onClose={() => setOpen(false)}
            onOpen={() => setOpen(true)}
          >
            <Header>Test Project</Header>
          </Modal>
        </div>

        <div style={{ marginTop: "10px" }} className="project-name-div">
          <Modal
            open={open}
            trigger={
              <Link
                style={{
                  color: "#343434",
                  fontFamily: "Source Sans Pro",
                  fontSize: "16px",
                  fontWeight: "500",
                }}
              >
                Test Project 5
              </Link>
            }
            onClose={() => setOpen(false)}
            onOpen={() => setOpen(true)}
          >
            <Header>Test Project</Header>
          </Modal>
        </div>

        <div style={{ marginTop: "10px" }} className="project-name-div">
          <Modal
            open={open}
            trigger={
              <Link
                style={{
                  color: "#343434",
                  fontFamily: "Source Sans Pro",
                  fontSize: "16px",
                  fontWeight: "500",
                }}
              >
                Test Project 6
              </Link>
            }
            onClose={() => setOpen(false)}
            onOpen={() => setOpen(true)}
          >
            <Header>Test Project </Header>
            <Modal.Content>
              <div style={{ fontFamily: "Source Sans Pro", fontSize: "18px" }}>
                <b style={{ fontSize: "16px" }}> Project Manager: </b> <br />
                Test Project Manager <Edit className="edit-icon" />
                <Trash2 className="delete-icon" />
                <br /> <br />
                <b style={{ fontSize: "16px" }}> Team Members: </b> <br />
                <div style={{ display: "flex" }}>
                  Test Team Member <Edit className="edit-icon" />
                  <Trash2 className="delete-icon" />
                </div>
                <div style={{ display: "flex" }}>
                  Test Team Member <Edit className="edit-icon" />
                  <Trash2 className="delete-icon" />
                </div>
                <div style={{ display: "flex" }}>
                  Test Team Member <Edit className="edit-icon" />
                  <Trash2 className="delete-icon" />
                </div>
                <div style={{ display: "flex" }}>
                  Test Team Member <Edit className="edit-icon" />
                  <Trash2 className="delete-icon" />
                </div>
                <div style={{ display: "flex" }}>
                  Test Team Member <Edit className="edit-icon" />
                  <Trash2 className="delete-icon" />
                </div>
              </div>

              <div className="create-task">
                <button
                  className="create-form-btn"
                  type="submit"
                  onClick={() => setOpen(false)} // reloads page on button click
                >
                  Close
                </button>
              </div>
            </Modal.Content>
          </Modal>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
