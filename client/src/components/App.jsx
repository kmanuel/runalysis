import React from 'react';
import Home from './Home';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Header from './Header';
import RunDetail from './RunDetail/RunDetail';

export default () => (
  <Router>
    <div className="container">
      <Header />
      <Route exact path="/" component={Home} />
      <Route path="/runs/:id" component={RunDetail} />
    </div>
  </Router>
);
