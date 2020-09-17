import React, { useEffect, useState } from "react";
import Axios from "./Axios";

function SayHello() {
  const [wallData, setWallData] = useState([]);
  // useEffect hook for fetching data from the database
  useEffect(() => {
    async function fetchData() {
      const response = await Axios.get("/wall-endpoint");
      setWallData(response.data);

      return response;
    }

    fetchData();
  }, []); // gets executed only once

  const getPost = () => {
    return <div style={{ marginTop: "400px" }}>hello</div>;
  };

  return (
    <div>
      <h1> Button onClick Event </h1>
      {getPost()}
    </div>
  );
}

export default SayHello;
