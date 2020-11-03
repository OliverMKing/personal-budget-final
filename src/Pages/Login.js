import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const history = useHistory();

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:3001/api/login", { username, password })
      .then((res) => {
        localStorage.setItem("jwt", res.data.token);
        history.push("/");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div>
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
        <label>Username</label>
        <input type="text" value={username} onChange={handleUsernameChange} />

        <label>Password</label>
        <input
          type="password"
          value={password}
          onChange={handlePasswordChange}
        />
        <input type="submit" value="Submit" />
      </form>
    </div>
  );
}

export default Login;
