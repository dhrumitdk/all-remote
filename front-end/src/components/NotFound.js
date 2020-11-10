import React from "react";

function NotFound() {
  return (
    <div>
      {/* header */}
      <div className="header-div">
        <h1 className="h1"> allRemote </h1>
      </div>
      <div
        style={{
          display: "grid",
          height: "80vh",
          placeItems: "center",
        }}
      >
        <h1 style={{ fontFamily: "Source Sans", fontSize: "52px" }}>
          Oops! Looks like you're lost!!!
        </h1>
      </div>
    </div>
  );
}

export default NotFound;
