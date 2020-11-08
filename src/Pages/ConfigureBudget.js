import React, { useEffect, useState } from "react";
import axios from "axios";

function ConfigureBudget() {
  const [budget, setBudget] = useState([]);

  // Call API
  useEffect(() => {
    const token = localStorage.getItem("jwt");

    axios
      .get("http://localhost:3001/api/budget", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        setBudget(res.data.budget);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  // Delete budget item
  const deleteItem = (id) => {
    const token = localStorage.getItem("jwt");
    axios
      .get(`http://localhost:3001/api/budget/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        setBudget(budget.filter((item) => item.id !== id));
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <>
      <h1>Configure Budget</h1>
      <h2>Current budget</h2>
      <ul>
        {budget.map((item) => {
          return (
            <li key={item.id}>
              {`${item.title} is ${item.budget}`} -{" "}
              <span onClick={() => deleteItem(item.id)}>Delete</span>
            </li>
          );
        })}
      </ul>
    </>
  );
}

export default ConfigureBudget;
