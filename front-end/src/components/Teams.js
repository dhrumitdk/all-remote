import React, { useEffect, useState } from "react";
import Axios from "./Axios";
import { MapPin, Share } from "react-feather";
import { Link } from "react-router-dom";
import { useStateValue } from "../StateProvider";

// functional component start here
function Teams() {
  const [teamData, setTeamData] = useState([]);
  const [{ accessCodeState }] = useStateValue();

  // useEffect hook for fetching data from the database
  useEffect(() => {
    async function fetchData() {
      const response = await Axios.get("/api/invitations");
      setTeamData(response.data);

      return response;
    }

    fetchData();
  }, []); // gets executed only once

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
          <li className="ul-menu-li">
            <Link className="menu-links" to="/login">
              Logout
            </Link>
          </li>
        </ul>
      </div>

      <div>
        {/* right side menu div */}
        <div className="right-portion">
          <h2> Your Team </h2>
          <button className="create-btn">
            <Share style={{ height: "15px" }} />
            <Link
              style={{ color: "white", fontFamily: "Source Sans Pro" }}
              to="/teams/invite"
            >
              Invite
            </Link>
          </button>
        </div>
      </div>
      <div style={{ marginTop: "160px", padding: "0", marginLeft: "-130px" }}>
        {teamData.map(({ name, designation, location, accessCode }) => (
          <div>
            {accessCode === accessCodeState ? (
              <div style={{ marginLeft: "20px", marginTop: "20px" }}>
                <div className="schedule-card">
                  <h3> {name} </h3>
                  <b> {designation} </b>
                  <div style={{ marginTop: "8px" }}>
                    <MapPin style={{ height: "12px" }} /> {location}
                  </div>
                </div>
              </div>
            ) : (
              <div> </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default Teams;
