import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Plus } from "react-feather";
import Axios from "./Axios";
import "../styles/Schedules.css";
import { useStateValue } from "../StateProvider";

// functional component start here
function Schedules() {
  const [scheduleData, setScheduleData] = useState([]);
  const [{ accessCodeState }] = useStateValue();

  // useEffect hook for fetching data from the database
  useEffect(() => {
    async function fetchData() {
      const response = await Axios.get("/api/schedules");
      setScheduleData(response.data);
      return response;
    }

    fetchData();
  }, []); // gets executed only once

  return (
    <div style={{ width: "800px", display: "flex", flexFlow: "wrap" }}>
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
            <li className="ul-menu-li">
              <Link className="menu-links" to="/login">
                Logout
              </Link>
            </li>
          </ul>
        </div>
      </div>

      {/* right side menu div */}
      <div className="right-portion">
        <h2> Your Schedules </h2>
        <button className="create-btn">
          <Plus style={{ height: "13px" }} />
          <Link
            style={{
              color: "white",
              fontFamily: "Source Sans Pro",
            }}
            to="/schedules/create"
          >
            Create
          </Link>
        </button>
      </div>

      {/* card that displays schedules */}
      <div>
        {scheduleData.map(({ title, date, url, accessCode }) => (
          <div>
            {accessCode === accessCodeState ? (
              <div className="schedule-div">
                <div className="schedule-card">
                  <div>
                    <h3> {title} </h3>
                  </div>
                  <div style={{ marginTop: "15px" }}>
                    {date} <br />
                    {url}
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

export default Schedules;
