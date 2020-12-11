import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";

function Navbar() {
  const [loggedIn, setLoggedIn] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const token = localStorage.getItem("jwt");
    setLoggedIn(token ? true : false);
  }, [location]);

  return (
    <ul className="mb-4 mt-4">
      <li className="inline-block">
        <Link
          className="bg-red-500 hover:bg-red-700 text-white font-bold rounded px-4 py-2"
          to="/"
        >
          Home
        </Link>
      </li>
      <li className="inline-block pl-2">
        <Link
          className="bg-red-500 hover:bg-red-700 text-white font-bold rounded px-4 py-2"
          to="/dashboard"
        >
          Dashboard
        </Link>
      </li>
      <li className="inline-block pl-2">
        <Link
          className="bg-red-500 hover:bg-red-700 text-white font-bold rounded px-4 py-2"
          to="/configure-budget"
        >
          Configure budget
        </Link>
      </li>{" "}
      {loggedIn ? (
        <li className="inline-block float-right">
          <Link
            className="bg-red-500 hover:bg-red-700 text-white font-bold rounded px-4 py-2"
            to="/logout"
          >
            Logout
          </Link>
        </li>
      ) : (
        <>
          <li className="inline-block float-right">
            <Link
              className="bg-red-500 hover:bg-red-700 text-white font-bold rounded px-4 py-2"
              to="/login"
            >
              Login
            </Link>
          </li>
          <li className="inline-block pr-2 float-right">
            <Link
              className="bg-red-500 hover:bg-red-700 text-white font-bold rounded px-4 py-2"
              to="/signup"
            >
              Signup
            </Link>
          </li>
        </>
      )}
    </ul>
  );
}

export default Navbar;
