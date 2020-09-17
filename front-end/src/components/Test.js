import React, { useEffect, useState } from "react";
import Axios from "./Axios";

function Test() {
  const [userData, setuserData] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const response = await Axios.get("/data-post-endpoint");
      setuserData(response.data);

      return response;
    }

    fetchData();
    console.log(userData);
  }, []);

  return (
    <div style={{ display: "grid", justifyContent: "center" }}>
      {userData.map(({ projectName, email, password }) => (
        <div>
          <h1 style={{ fontFamily: "roboto", fontSize: "22px" }}>
            Project Name: {projectName}
          </h1>
          <p style={{ fontFamily: "roboto", fontSize: "14px" }}>
            Password: {password}
          </p>
          <br />
        </div>
      ))}
    </div>
  );
}

export default Test;
