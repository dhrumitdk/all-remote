import React, { useState, useEffect } from "react";
import { useFormik } from "formik";
import axios from "axios";
import Axios from "./Axios";

const initialValues = {
  taskName: "",
};

function FindOne() {
  useEffect(() => {
    async function fetchData() {
      const response = await Axios.get("/find-one-endpoint");
      setTaskData(response.data);

      return response;
    }

    fetchData();
  }, []);

  const [taskData, setTaskData] = useState([]);

  const formik = useFormik({
    initialValues,
    onSubmit: (values) => {
      axios
        .post("http://localhost:4000/find-one-endpoint", values)
        .then((res) => {
          window.location.reload();
        });
    },
  });

  const task = "Test task 2";
  return (
    <div>
      {taskData.map(({ taskName }) => (
        <div>{taskName === task ? <div> {taskName} </div> : null}</div>
      ))}
    </div>
  );
}

export default FindOne;
