import React, { useEffect, useState } from "react";
import "../../styles/Dashboard.css";
import { Trash2 } from "react-feather";
import Axios from "../Axios";
import { Link } from "react-router-dom";

function Dashboard() {
  const [projectData, setProjectData] = useState([]);
  // useEffect hook for fetching data from the database
  useEffect(() => {
    async function fetchData() {
      const response = await Axios.get("/api/user-signup");
      setProjectData(response.data);

      return response;
    }

    fetchData();
  }, []); // gets executed only once

  const deleteProject = (id) => {
    Axios.post(`/api/delete-project/${id}`).then((res) => {
      window.location.reload();
    });
  };

  return (
    <div>
      {/* header */}
      <h1 className="header-h1"> allRemote </h1>
      <Link style={{ marginLeft: "20px", fontSize: "14px" }} to="/admin/login">
        {" "}
        Logout{" "}
      </Link>

      <div className="projects-div">
        <p style={{ fontSize: "34px", color: "#343434" }}> Projects </p>
        <Link style={{ fontSize: "16px" }} to="/admin/users">
          {" "}
          Users{" "}
        </Link>
      </div>

      {/* Project Names */}
      <div className="project-div">
        {projectData.map(({ _id, projectName }) => (
          <div className="project-name-div">
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <h4> {projectName} </h4>
              <div>
                <Trash2
                  className="delete-icon"
                  onClick={() => {
                    deleteProject(_id);
                  }}
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Dashboard;
