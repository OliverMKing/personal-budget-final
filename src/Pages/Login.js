import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [failure, setFailure] = useState("");
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
      .post(`${process.env.REACT_APP_API_SERVER}/api/login`, {
        username,
        password,
      })
      .then((res) => {
        localStorage.setItem("jwt", res.data.token);
        history.push("/");
      })
      .catch((err) => {
        setFailure("Username and password not valid. Please try again.");
        console.log(err);
      });
  };

  return (
    <div>
      <h1 className="text-3xl">Login</h1>
      <section>
        {failure.length > 0 && (
          <div className="mt-4 text-red-500">{failure}</div>
        )}
        <form className="mt-4" onSubmit={handleSubmit}>
          <div className="flex flex-col">
            <label>Username</label>
            <input
              className="p-1 border border-gray-500 rounded"
              type="text"
              value={username}
              onChange={handleUsernameChange}
            />
          </div>

          <div className="flex flex-col mt-2">
            <label>Password</label>
            <input
              className="p-1 border border-gray-500 rounded"
              type="password"
              value={password}
              onChange={handlePasswordChange}
            />
          </div>
          <input
            className="w-full mt-2 p-2 rounded cursor-pointer bg-blue-500 hover:bg-blue-700 text-white font-bold"
            type="submit"
            value="Login"
          />
        </form>
      </section>
    </div>
  );
}

export default Login;
