import React from "react";
import { Link } from "react-router-dom";

const authenticatedHoc = (Component) => {
  return (props) => {
    const token = localStorage.getItem("jwt");
    if (token) return <Component {...props} />;

    return (
      <div>
        <h1 className="text-3xl">You must be logged in</h1>
        <p className="text-xl mt-4">
          <Link className="text-blue-500" to="/login">
            Log in
          </Link>{" "}
          or{" "}
          <Link className="text-blue-500" to="/signup">
            signup
          </Link>{" "}
          to view the contents of this page.
        </p>
      </div>
    );
  };
};

export default authenticatedHoc;
