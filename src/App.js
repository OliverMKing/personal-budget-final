import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Index from "./Pages/Index";
import Login from "./Pages/Login";
import Signup from "./Pages/Signup";
import Navbar from "./Components/Navbar";
import Logout from "./Pages/Logout";
import Dashboard from "./Pages/Dashboard";
import ConfigureBudget from "./Pages/ConfigureBudget";
import authenticatedHOC from "./Components/AuthenticatedHoc";

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <Switch>
          <Route path="/login">
            <Login />
          </Route>
          <Route path="/signup">
            <Signup />
          </Route>
          <Route path="/logout">
            <Logout />
          </Route>
          <Route path="/dashboard">{authenticatedHOC(Dashboard)}</Route>
          <Route path="/configure-budget">
            {authenticatedHOC(ConfigureBudget)}
          </Route>
          <Route path="/">
            <Index />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
