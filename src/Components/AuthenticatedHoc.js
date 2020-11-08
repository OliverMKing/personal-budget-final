import React from "react";
import { Link } from "react-router-dom";

const authenticatedHoc = (Component) => {
  return (props) => {
    const token = localStorage.getItem("jwt");
    if (token) return <Component {...props} />;

    return (
      <div>
        <h1>You must be logged in</h1>
        <p>
          <Link to="/login">Log in</Link> or <Link to="signup">signup</Link> to
          view the contents of this page.
        </p>
      </div>
    );
  };
};

export default authenticatedHoc;
