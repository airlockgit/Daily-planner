import React from 'react';
import { BrowserRouter, Switch, Redirect, Route, Link } from 'react-router-dom';
import './App.css';
import Calendar from './containers/calendar';

const App = () => (
  <div className="App">
    <Calendar />
  </div>
);

export default App;
