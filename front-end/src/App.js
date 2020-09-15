import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import "semantic-ui-css/semantic.min.css";
import Login from "./components/Login";
import SignUp from "./components/Signup";
import Test from "./components/Test";
import Schedules from "./components/Schedules";
import Teams from "./components/Teams";
import Blog from "./components/Blog";
import Tasks from "./components/Tasks";

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={SignUp} />
        <Route path="/login" exact component={Login} />
        <Route path="/test" exact component={Test} />
        <Route path="/tasks" exact component={Tasks} />
        <Route path="/schedules" exact component={Schedules} />
        <Route path="/teams" exact component={Teams} />
        <Route path="/blog" exact component={Blog} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
