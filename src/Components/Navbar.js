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
    <ul>
      <li>
        <Link to="/">Home</Link>
      </li>
      {loggedIn ? (
        <li>
          <Link to="/logout">Logout</Link>
        </li>
      ) : (
        <>
          <li>
            <Link to="/login">Login</Link>
          </li>
          <li>
            <Link to="/signup">Signup</Link>
          </li>
        </>
      )}

      <li>
        <Link to="/dashboard">Dashboard</Link>
      </li>
      <li>
        <Link to="/configure-budget">Configure budget</Link>
      </li>
    </ul>
  );
}

export default Navbar;
