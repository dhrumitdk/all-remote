import React, { useEffect, useState } from "react";
import "../../styles/Dashboard.css";
import { Edit, Trash2 } from "react-feather";
import Axios from "../Axios";

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

  return (
    <div>
      {/* header */}
      <h1 className="header-h1"> allRemote </h1>

      <div className="projects-div">
        <p style={{ fontSize: "34px", color: "#343434" }}> Projects </p>
      </div>

      {/* Project Names */}
      <div className="project-div">
        {projectData.map(({ _id, projectName }) => (
          <div className="project-name-div">
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <h4> {projectName} </h4>
              <div>
                <Edit className="edit-icon" />
                <Trash2 className="delete-icon" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Dashboard;
