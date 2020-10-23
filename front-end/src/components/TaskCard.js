import React, { useState, useEffect } from "react";
import Axios from "./Axios";
import "../styles/TaskCard.css";

function TaskCard() {
  // creating state for task data
  const [taskData, setTaskData] = useState([]);

  // useEffect hook for fetching data from the database
  useEffect(() => {
    async function fetchData() {
      const response = await Axios.get("/task-endpoint");
      setTaskData(response.data);

      return response;
    }

    fetchData();
  }, []); // gets executed only once
  return (
    <div>
      {/* card that displays tasks */}
      <div>
        {taskData.map(({ taskName, assignee, dueDate, priority }) => (
          <div className="task__card">
            <div style={{ display: "flex" }}>
              <b> {taskName} </b>
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
        ))}
      </div>
    </div>
  );
}

export default TaskCard;
