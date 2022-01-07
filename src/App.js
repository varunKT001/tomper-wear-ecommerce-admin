import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { Dashboard, LoginPage, PrivateRoute } from './pages';

function App() {
  return (
    <Router>
      <Switch>
        <PrivateRoute exact path='/'>
          <Dashboard />
        </PrivateRoute>
        <PrivateRoute exact path='/login'>
          <LoginPage />
        </PrivateRoute>
      </Switch>
    </Router>
  );
}

export default App;
