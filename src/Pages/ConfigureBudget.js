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
      .get("http://206.81.9.116/api/budget", {
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
      .get(`http://206.81.9.116/api/budget/${id}`, {
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
    if (name === "" || value <= 0) {
      setFailure(
        "Fields are not correct. Make sure name is filled out and value is above 0."
      );
      return;
    }

    const token = localStorage.getItem("jwt");

    axios
      .post(
        "http://206.81.9.116/api/budget",
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
        setFailure("");
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
      <h1 className="text-3xl">Configure Budget</h1>
      {budget.length > 0 && (
        <>
          <h2 className="text-xl mt-2">Current budget</h2>
          <ul className="mt-4">
            {budget.map((item) => {
              return (
                <li key={item.id}>
                  {`${item.title} is ${item.budget}`} -{" "}
                  <span
                    className="cursor-pointer text-red-500"
                    onClick={() => deleteItem(item.id)}
                  >
                    Delete
                  </span>
                </li>
              );
            })}
          </ul>
        </>
      )}
      <h2 className="text-xl mt-2">Add new budget item</h2>
      {failure.length > 0 && <div className="mt-4 text-red-500">{failure}</div>}
      <form className="mt-4" onSubmit={handleSubmit}>
        <div className="flex flex-col">
          <label>Name</label>
          <input
            className="p-1 border border-gray-500 rounded"
            type="text"
            value={name}
            onChange={handleNameChange}
          />
        </div>

        <div className="flex flex-col mt-2">
          <label>Value</label>
          <input
            className="p-1 border border-gray-500 rounded"
            type="number"
            value={value}
            onChange={handleValueChange}
          />
        </div>
        <input
          className="w-full mt-2 p-2 rounded cursor-pointer bg-blue-500 hover:bg-blue-700 text-white font-bold"
          type="submit"
          value="Add"
        />
      </form>{" "}
    </>
  );
}

export default ConfigureBudget;
