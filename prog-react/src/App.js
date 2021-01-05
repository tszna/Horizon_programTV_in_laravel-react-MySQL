import React from 'react';

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import ProgramTv from './Components/ProgramTv/ProgramTv';
import LoginForm from "./Components/Auth/LoginForm";

function App() {
  return (
    <Router>
    <div>
      <nav>
        <div className="d-flex justify-content-center">
          <Link className="mx-1" to="/">Home</Link>
          <Link className="mx-1" to="/login">Login</Link>
          <Link className="mx-1" to="/users">Users</Link>
          <Link className="mx-1" to="/program-tv">Program TV</Link>
        </div>
      </nav>

      {/* A <Switch> looks through its children <Route>s and
          renders the first one that matches the current URL. */}
      <Switch>
        <Route path="/login">
          <LoginForm />
        </Route>
        <Route path="/users">
          <h1>Test2</h1>
        </Route>
        <Route path="/program-tv">
          <ProgramTv />
        </Route>
        <Route path="/">
          <h1>Test3</h1>
        </Route>
      </Switch>
    </div>
  </Router>
  );
}

export default App;
