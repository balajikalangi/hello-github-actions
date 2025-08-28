import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Landing from './components/layout/Landing';
import Register from './components/auth/Register';
import Login from './components/auth/Login';
import Opportunities from './components/opportunities/Opportunities';
import Opportunity from './components/opportunities/Opportunity';
import Dashboard from './components/dashboard/Dashboard';
import './App.css';

const App = () => {
  return (
    <Router>
      <>
        <Navbar />
        <Route exact path="/" component={Landing} />
        <section className="container">
          <Switch>
            <Route exact path="/register" component={Register} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/opportunities" component={Opportunities} />
            <Route exact path="/opportunities/:id" component={Opportunity} />
            <Route exact path="/dashboard" component={Dashboard} />
          </Switch>
        </section>
      </>
    </Router>
  );
};

export default App;
