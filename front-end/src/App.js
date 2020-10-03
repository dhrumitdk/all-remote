import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import "semantic-ui-css/semantic.min.css";
import Login from "./components/Login";
import SignUp from "./components/Signup";
import Test from "./components/Test";
import Schedules from "./components/Schedules";
import Teams from "./components/Teams";
import Wall from "./components/Wall";
import Tasks from "./components/Tasks";
import FindOne from "./components/FindOne";
import SayHello from "./components/SayHello";
import CreatePosts from "./components/CreatePosts";
import AdminLogin from "./components/Admin/AdminLogin";
import Dashboard from "./components/Admin/Dashboard";

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
        <Route path="/wall" exact component={Wall} />
        <Route path="/posts/create" exact component={CreatePosts} />
        <Route path="/hello" exact component={SayHello} />
        <Route path="/find" exact component={FindOne} />
        <Route path="/admin/login" exact component={AdminLogin} />
        <Route path="/admin/dashboard" exact component={Dashboard} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
