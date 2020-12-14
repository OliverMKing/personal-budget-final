import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import {
  VictoryPie,
  VictoryChart,
  VictoryTheme,
  VictoryBar,
  VictoryStack,
  VictoryLabel,
} from "victory";

function Dashboard() {
  const [budget, setBudget] = useState([]);

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
  return (
    <>
      <h1 className="text-3xl">Dashboard</h1>{" "}
      {budget.length === 0 ? (
        <section className="mt-2">
          You have no entries in your budget.{" "}
          <Link to="configure-budget" className="text-blue-500">
            Add them now?
          </Link>
        </section>
      ) : (
        <>
          <section>
            <h2 className="text-2xl">Pie Chart</h2>
            <h3 className="text-xl">Budget</h3>
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
            <h3 className="text-xl">Actual</h3>
            <div className="flex items-center justify-center">
              <div style={{ width: "500px" }}>
                <VictoryPie
                  theme={VictoryTheme.material}
                  labelComponent={<VictoryLabel renderInPortal />}
                  data={budget.map((budgetItem) => {
                    return { x: budgetItem.title, y: budgetItem.curr_amount };
                  })}
                />
              </div>
            </div>
          </section>
          <section>
            <h2 className="text-2xl">Bar Chart</h2>
            <h3 className="text-xl">Budget</h3>
            <div className="flex items-center justify-center">
              <div style={{ width: "500px" }}>
                <VictoryChart domainPadding={10} theme={VictoryTheme.material}>
                  <VictoryBar
                    style={{
                      data: { fill: "#c43a31" },
                    }}
                    data={budget.map((budgetItem) => {
                      return { x: budgetItem.title, y: budgetItem.budget };
                    })}
                  />
                </VictoryChart>
              </div>
            </div>
            <h3 className="text-xl">Actual</h3>
            <div className="flex items-center justify-center">
              <div style={{ width: "500px" }}>
                <VictoryChart domainPadding={10} theme={VictoryTheme.material}>
                  <VictoryBar
                    style={{
                      data: { fill: "#c43a31" },
                    }}
                    data={budget.map((budgetItem) => {
                      return { x: budgetItem.title, y: budgetItem.curr_amount };
                    })}
                  />
                </VictoryChart>
              </div>
            </div>
          </section>
          <section>
            <h2 className="text-2xl">Stack Chart</h2>
            <h3 className="text-xl">Budget</h3>
            <div className="flex items-center justify-center">
              <div style={{ width: "500px" }}>
                <VictoryStack domainPadding={10} theme={VictoryTheme.material}>
                  {budget.map((budgetItem) => {
                    return (
                      <VictoryBar
                        barWidth={500}
                        labelComponent={<VictoryLabel />}
                        labels={[budgetItem.title]}
                        data={[{ x: budgetItem.title, y: budgetItem.budget }]}
                      />
                    );
                  })}
                </VictoryStack>
              </div>
            </div>
            <h3 className="text-xl">Acutal</h3>
            <div className="flex items-center justify-center">
              <div style={{ width: "500px" }}>
                <VictoryStack domainPadding={10} theme={VictoryTheme.material}>
                  {budget.map((budgetItem) => {
                    return (
                      <VictoryBar
                        barWidth={500}
                        labelComponent={<VictoryLabel />}
                        labels={[budgetItem.title]}
                        data={[
                          { x: budgetItem.title, y: budgetItem.curr_amount },
                        ]}
                      />
                    );
                  })}
                </VictoryStack>
              </div>
            </div>
          </section>
        </>
      )}
    </>
  );
}

export default Dashboard;
