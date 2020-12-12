import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import {
  VictoryPie,
  VictoryChart,
  VictoryTheme,
  VictoryBar,
  VictoryLabel,
} from "victory";

function Dashboard() {
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
  return (
    <>
      <h1 className="text-3xl">Dashboard</h1>{" "}
      {budget.length === 0 ? (
        <div className="mt-2">
          You have no entries in your budget.{" "}
          <Link to="configure-budget" className="text-blue-500">
            Add them now?
          </Link>
        </div>
      ) : (
        <>
          <h2 className="text-2xl">Pie Chart</h2>
          <div className="flex items-center justify-center">
            <div style={{ width: "500px" }}>
              <VictoryPie
                theme={VictoryTheme.material}
                labelComponent={<VictoryLabel renderInPortal />}
                data={budget.map((budgetItem) => {
                  return { x: budgetItem.title, y: budgetItem.budget };
                })}
              />
            </div>
          </div>
          <h2 className="text-2xl">Bar Chart</h2>
          <div className="flex items-center justify-center">
            <div style={{ width: "500px" }}>
              <VictoryChart theme={VictoryTheme.material} domainPadding={10}>
                <VictoryBar
                  theme={VictoryTheme.material}
                  data={budget.map((budgetItem) => {
                    return { x: budgetItem.title, y: budgetItem.budget };
                  })}
                />
              </VictoryChart>
            </div>
          </div>
        </>
      )}
    </>
  );
}

export default Dashboard;
