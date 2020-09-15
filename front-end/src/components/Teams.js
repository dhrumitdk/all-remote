import React from "react";
import { Link } from "react-router-dom";

// functional component start here
function Teams() {
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
            <Link to="/blog" className="menu-links">
              Blog
            </Link>
          </li>
        </ul>
      </div>

      {/* right side menu div */}
      <div className="right-portion">
        <h2> Your Teams </h2>
      </div>
    </div>
  );
}

export default Teams;
