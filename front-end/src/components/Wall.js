import Axios from "./Axios";
import "../styles/Wall.css";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Header, Modal } from "semantic-ui-react";
import { Share2 } from "react-feather";

// functional component start here
function Wall() {
  const [wallData, setWallData] = useState([]);
  const [open, setOpen] = useState(false);

  // useEffect hook for fetching data from the database
  useEffect(() => {
    async function fetchData() {
      const response = await Axios.get("/api/walls");
      setWallData(response.data);

      return response;
    }

    fetchData();
  }, []); // gets executed only once

  // storing the info fetched from backend to state
  const [postTitle, setTitle] = useState("");
  const [postContent, setContent] = useState("");

  // getPost function that fetches the data from backend
  const getPost = async (id) => {
    const post = await Axios.get(`/posts/${id}`);
    console.log(post.data);
    setTitle(post.data.title);
    setContent(post.data.content);
  };

  return (
    <div>
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
            <li className="ul-menu-li">
              <Link to="/teams" className="menu-links">
                Teams
              </Link>
            </li>
            <li className="active-ul-menu-li">
              <Link to="/wall" className="active-menu-link">
                Wall
              </Link>
            </li>
          </ul>
        </div>

        {/* right side menu div */}
        <div className="right-portion">
          <div className="top">
            <h2 style={{ marginLeft: "8px", color: "#343434" }}> Your Wall </h2>

            <button className="share-thoughts-btn">
              <Share2 style={{ height: "15px" }} />
              <Link
                style={{ color: "white", fontFamily: "Source Sans Pro" }}
                to="/posts/create"
              >
                {" "}
                Share your thoughts{" "}
              </Link>
            </button>
          </div>
        </div>
      </div>

      {wallData.map(({ _id, title }) => (
        <div className="wall-links">
          {/* displaying the data of the post based on id in modal */}
          <Modal
            open={open}
            trigger={
              <Link
                style={{
                  color: "#343434",
                  fontFamily: "Source Sans Pro",
                  fontSize: "24px",
                  fontWeight: "bold",
                }}
                onClick={() => getPost(_id)}
              >
                {" "}
                {title}{" "}
              </Link>
            }
            onClose={() => setOpen(false)}
            onOpen={() => setOpen(true)}
          >
            <Header>{postTitle}</Header>
            <Modal.Content>
              <div style={{ fontFamily: "Source Sans Pro", fontSize: "18px" }}>
                {postContent}
              </div>

              <div className="create-task">
                <button
                  className="create-form-btn"
                  type="submit"
                  onClick={() => setOpen(false)} // reloads page on button click
                >
                  Close
                </button>
              </div>
            </Modal.Content>
          </Modal>
        </div>
      ))}
    </div>
  );
}

export default Wall;
