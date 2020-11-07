import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";

function Logout() {
  const history = useHistory();

  useEffect(() => {
    localStorage.removeItem("jwt");
    history.push("/");
  });

  return (
    <div>
      <h1>Logging out...</h1>
    </div>
  );
}

export default Logout;
