import React, { useState, useEffect } from "react";
import Axios from "./Axios";
import "../styles/TaskCard.css";
import { useStateValue } from "../StateProvider";
import { Check } from "react-feather";

function TaskCard() {
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

  const completedTask = (id) => {
    Axios.post(`/api/completed-tasks/${id}`);
  };

  return (
    <div>
      {/* card that displays tasks */}
      <div>
        {taskData.map(
          ({ _id, taskName, assignee, dueDate, priority, accessCode }) => (
            <div className="task__card">
              {accessCode === accessCodeState ? (
                <div>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      marginRight: "20px",
                    }}
                  >
                    <b> {taskName} </b>
                    <Check
                      style={{ height: "24px", cursor: "pointer" }}
                      onClick={() => {
                        completedTask(_id);
                      }}
                    />
                  </div>
                  <div style={{ marginTop: "15px" }}>
                    {assignee} <br />
                    {dueDate}
                  </div>
                  <div style={{ marginTop: "100px" }}>
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
              ) : (
                <div></div>
              )}
            </div>
          )
        )}
      </div>
    </div>
  );
}

export default TaskCard;
