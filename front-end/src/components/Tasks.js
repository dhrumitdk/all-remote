import React from "react";
import "../styles/Tasks.css";
import { Link } from "react-router-dom";
import { Plus } from "react-feather";
import TaskCard from "./TaskCard";

// functional component start here
function Tasks() {
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
            <li className="ul-menu-li">
              <Link className="menu-links" to="/login">
                Logout
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

      <div style={{ marginLeft: "390px", marginTop: "20px" }}>
        <Link to="/tasks/completed" style={{ fontSize: "16px" }}>
          Completed Tasks
        </Link>
      </div>

      <div>
        {/* all tasks */}
        <h5 style={{ marginTop: "50px", marginLeft: "390px" }}>All Tasks</h5>
      </div>
      <div style={{ display: "flex", justifyContent: "space-around" }}>
        {/* card that displays tasks */}
        <TaskCard />
      </div>
    </div>
  );
}

export default Tasks;
