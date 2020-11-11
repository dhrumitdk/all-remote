import React, { useState, useEffect } from "react";
import Axios from "./Axios";
import "../styles/CompletedTask.css";
import { useStateValue } from "../StateProvider";
import { Check } from "react-feather";

function CompletedTask() {
  // creating state for task data
  const [taskData, setTaskData] = useState([]);
  const [{ accessCodeState }] = useStateValue();

  // useEffect hook for fetching data from the database
  useEffect(() => {
    async function fetchData() {
      const response = await Axios.get("/api/tasks");
      setTaskData(response.data);

      return response;
    }

    fetchData();
  }, []); // gets executed only once
  return (
    <div>
      {/* header */}
      <div className="header-div">
        <h1 className="h1"> allRemote </h1>
      </div>
      {/* card that displays tasks */}
      <div style={{ marginLeft: "50px", marginTop: "50px" }}>
        <p
          style={{
            fontSize: "24px",
            fontFamily: "Source Sans Pro",
            color: "#343434",
          }}
        >
          Completed Tasks
        </p>
        {taskData.map(
          ({ accessCode, taskName, assignee, dueDate, priority, status }) => (
            <div>
              {status === "completed" && accessCode === accessCodeState ? (
                <div className="task__card">
                  <div>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        paddingRight: "20px",
                      }}
                    >
                      <b> {taskName} </b>
                      <Check
                        style={{
                          height: "24px",
                          cursor: "pointer",
                          color: "#4eff1d",
                        }}
                      />
                    </div>
                    <div style={{ marginTop: "15px" }}>
                      {assignee} <br />
                      {dueDate}
                    </div>
                    <div style={{ marginTop: "10px" }}>
                      {/* conditional rendering based on priority */}
                      {priority === "Low" ? (
                        <div className="lowPriority"> {priority} </div>
                      ) : priority === "Medium" ? (
                        <div className="mediumPriority"> {priority} </div>
                      ) : (
                        <div className="highPriority"> {priority} </div>
                      )}
                    </div>
                  </div>
                </div>
              ) : (
                <div> </div>
              )}
            </div>
          )
        )}
      </div>
    </div>
  );
}

export default CompletedTask;
