import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Header from './components/Header';
import Posts from './components/Posts';
import NotFound from './components/NotFound';
import User from './components/User';
import Tag from './components/Tag';

function App() {
  return (
    <div className="App">
      <div className="Wrapper">
        <Router>
          <Header/>
          <Switch>
            <Route path="/" exact component={Posts} />
            <Route path="/user/:id" component={User} />
            <Route path="/tag/:tag" component={Tag} />
            <Route component={NotFound} />
          </Switch>
        </Router>
      </div>
    </div>
  );
}

export default App;
