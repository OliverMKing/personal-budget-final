import React, { useEffect, useState } from "react";
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
      <h1>Dashboard</h1>
      <h2>Pie Chart</h2>
      <div style={{ width: "500px", padding: "2rem" }}>
        <VictoryPie
          theme={VictoryTheme.material}
          labelComponent={<VictoryLabel renderInPortal />}
          data={budget.map((budgetItem) => {
            return { x: budgetItem.title, y: budgetItem.budget };
          })}
        />
      </div>
      <h2>Bar Chart</h2>
      <div style={{ width: "500px", padding: "2rem" }}>
        <VictoryChart theme={VictoryTheme.material} domainPadding={10}>
          <VictoryBar
            theme={VictoryTheme.material}
            data={budget.map((budgetItem) => {
              return { x: budgetItem.title, y: budgetItem.budget };
            })}
          />
        </VictoryChart>
      </div>
    </>
  );
}

export default Dashboard;
