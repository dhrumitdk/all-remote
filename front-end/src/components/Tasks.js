import React from "react";
import "../styles/Tasks.css";
import { Link } from "react-router-dom";
import { Check, Plus } from "react-feather";
import TaskCard from "./TaskCard";
import CompletedTask from "./CompletedTask";

// functional component start here
function Tasks() {
  const priorityOptions = [
    { key: 1, text: "Low", value: 1 },
    { key: 2, text: "Medium", value: 2 },
    { key: 3, text: "High", value: 3 },
  ];

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
          <h2> Your Tasks </h2>
          <button className="create-btn">
            <Plus style={{ height: "15px" }} />
            <Link
              style={{ color: "white", fontFamily: "Source Sans Pro" }}
              to="/tasks/create"
            >
              Create
            </Link>
          </button>
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
