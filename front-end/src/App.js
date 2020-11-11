import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import "semantic-ui-css/semantic.min.css";
import Login from "./components/Login";
import SignUp from "./components/Signup";
import Schedules from "./components/Schedules";
import Teams from "./components/Teams";
import Wall from "./components/Wall";
import Tasks from "./components/Tasks";
import CreatePosts from "./components/CreatePosts";
import AdminLogin from "./components/Admin/AdminLogin";
import Dashboard from "./components/Admin/Dashboard";
import CreateSchedules from "./components/CreateSchedules";
import CreateTasks from "./components/CreateTasks";
import SendInvitations from "./components/SendInvitations";
import NotFound from "./components/NotFound";
import Users from "./components/Admin/Users";
import CompletedTask from "./components/CompletedTask";

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={SignUp} />
        <Route path="/login" exact component={Login} />
        <Route path="/tasks" exact component={Tasks} />
        <Route path="/tasks/create" exact component={CreateTasks} />
        <Route path="/tasks/completed" exact component={CompletedTask} />
        <Route path="/schedules" exact component={Schedules} />
        <Route path="/schedules/create" exact component={CreateSchedules} />
        <Route path="/teams" exact component={Teams} />
        <Route path="/teams/invite" exact component={SendInvitations} />
        <Route path="/wall" exact component={Wall} />
        <Route path="/posts/create" exact component={CreatePosts} />
        <Route path="/admin/login" exact component={AdminLogin} />
        <Route path="/admin/dashboard" exact component={Dashboard} />
        <Route path="/admin/users" exact component={Users} />
        <Route exact component={NotFound} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
