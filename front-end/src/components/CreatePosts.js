import { useFormik } from "formik";
import React from "react";
import { Input, TextArea } from "semantic-ui-react";
import Axios from "./Axios";
import "../styles/CreatePosts.css";
import { useHistory } from "react-router-dom";

// validation function for formik
const validate = (values) => {
  let errors = {};

  if (!values.title) {
    errors.title = "This field cannot be empty";
  }

  if (!values.content) {
    errors.content = "This field cannot be empty";
  }

  return errors;
};

function CreatePosts() {
  const history = useHistory();
  const accessCodeData = "testAccessCode";

  // formik form starts here
  const formik = useFormik({
    initialValues: {
      title: "",
      content: "",
      accessCode: accessCodeData,
    },
    validate,
    onSubmit: (values) => {
      Axios.post("/wall-endpoint", values).then((res) => {
        history.push("/wall");
      });
    },
  });

  return (
    <div>
      {/* header */}
      <div className="header-div">
        <h1 className="h1"> allRemote </h1>
      </div>

      <div style={{ marginTop: "50px", marginLeft: "50px" }}>
        <p
          style={{
            fontSize: "24px",
            fontFamily: "Source Sans Pro",
            color: "#343434",
          }}
        >
          Create Post
        </p>

        <form onSubmit={formik.handleSubmit}>
          {/* div for Post Title */}
          <div>
            <label className="label"> Post Title* </label> <br />
            <Input
              name="title"
              type="text"
              placeholder="Example: Demo Title"
              className="input"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.title}
            />
            {/* displays validations */}
            {formik.touched.title && formik.errors.title ? (
              <div className="error-div"> {formik.errors.title} </div>
            ) : null}
          </div>

          {/* div for Content of the post */}
          <div style={{ marginTop: "10px" }}>
            <label className="label"> Content* </label> <br />
            <TextArea
              name="content"
              type="text"
              placeholder="Share your thoughts here..."
              className="textarea"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.content}
            />
            {/* displays validations */}
            {formik.touched.content && formik.errors.content ? (
              <div className="error-div"> {formik.errors.content} </div>
            ) : null}
          </div>

          {/* div for Publish button */}
          <div style={{ marginTop: "30px" }}>
            <button className="share-thoughts-btn">Publish</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default CreatePosts;
