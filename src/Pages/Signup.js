import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";

function Signup() {
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
      .post("http://localhost:3001/api/signup", { username, password })
      .then((res) => {
        history.push("/");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div>
      <h1 className="text-3xl">Signup</h1>
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
          value="Submit"
        />
      </form>
    </div>
  );
}

export default Signup;
