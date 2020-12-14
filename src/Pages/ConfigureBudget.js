import React, { useEffect, useState } from "react";
import axios from "axios";

function ConfigureBudget() {
  const [budget, setBudget] = useState([]);
  const [name, setName] = useState("");
  const [value, setValue] = useState(0);
  const [failure, setFailure] = useState("");
  const [selectedItem, setSelectedItem] = useState(0);

  // Call API
  useEffect(() => {
    const token = localStorage.getItem("jwt");

    axios
      .get(`${process.env.REACT_APP_API_SERVER}/api/budget`, {
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
      .get(`${process.env.REACT_APP_API_SERVER}/api/budget/${id}`, {
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
        `${process.env.REACT_APP_API_SERVER}/api/budget`,
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

  const handleBudgetItemSelect = (e) => {
    setSelectedItem(e.target.value);
  };

  const handleExpenseChange = (e) => {
    let copy = Array.from(budget);
    copy[selectedItem].curr_amount = e.target.value;
    setBudget(copy);
  };

  const amountChange = () => {
    const token = localStorage.getItem("jwt");
    const id = budget[selectedItem].id;
    axios
      .post(
        `${process.env.REACT_APP_API_SERVER}/api/budget/${id}`,
        {
          amount: budget[selectedItem].curr_amount,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((res) => {})
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <>
      <h1 className="text-3xl">Configure Budget</h1>
      {budget.length > 0 && (
        <section>
          <h2 className="text-xl mt-2">Current budget</h2>
          <ul className="mt-4">
            {budget.map((item) => {
              return (
                <li key={item.id}>
                  {`${item.title}. Budget: ${item.budget}. Current amount: ${item.curr_amount}. `}{" "}
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
        </section>
      )}

      {budget.length > 0 && (
        <section>
          <h2 className="text-xl mt-4">Modify current budget amount</h2>
          <div className="flex flex-col">
            <label>Budget item</label>
            <select
              value={selectedItem}
              onChange={handleBudgetItemSelect}
              className="p-1 border border-gray-500 rounded"
            >
              {budget.map((item, index) => (
                <option key={item.title} value={index}>
                  {item.title}
                </option>
              ))}
            </select>
          </div>
          <div className="flex flex-col mt-2">
            <label>New amount</label>
            <input
              className="p-1 border border-gray-500 rounded"
              type="number"
              value={budget[selectedItem].curr_amount}
              onChange={handleExpenseChange}
              min={0}
            />
          </div>
          <button
            onClick={amountChange}
            className="w-full mt-2 p-2 rounded cursor-pointer bg-blue-500 hover:bg-blue-700 text-white font-bold"
          >
            Modify Item
          </button>
        </section>
      )}

      <section>
        <h2 className="text-xl mt-8">Add new budget item</h2>
        {failure.length > 0 && (
          <div className="mt-4 text-red-500">{failure}</div>
        )}
        <form className="mt-2" onSubmit={handleSubmit}>
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
              min="0"
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
      </section>
    </>
  );
}

export default ConfigureBudget;
