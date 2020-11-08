import React, { useEffect, useState } from "react";
import axios from "axios";

function ConfigureBudget() {
  const [budget, setBudget] = useState([]);
  const [name, setName] = useState("");
  const [value, setValue] = useState(0);
  const [failure, setFailure] = useState("");

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

  // Add new budget item
  const handleSubmit = (e) => {
    e.preventDefault();
    if (name === "" && value >= 0) {
      setFailure("Fields are not correct. Make sure name is filled out.");
      return;
    }

    const token = localStorage.getItem("jwt");

    axios
      .post(
        "http://localhost:3001/api/budget",
        {
          name,
          value,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((res) => {
        setBudget([
          ...budget,
          {
            id: res.data.budgetId,
            title: name,
            budget: value,
          },
        ]);
        setName("");
        setValue(0);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleValueChange = (e) => {
    setValue(e.target.value);
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
      <h2>Add new budget item</h2>
      <form onSubmit={handleSubmit}>
        <label>Name</label>
        <input type="text" value={name} onChange={handleNameChange} />

        <label>Value</label>
        <input type="number" value={value} onChange={handleValueChange} />
        <input type="submit" value="Submit" />
      </form>{" "}
      {failure.length > 0 && <p>{failure}</p>}
    </>
  );
}

export default ConfigureBudget;
