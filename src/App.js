import React, { Component } from 'react';

import Todo from './components/Todo';
import Header from './components/Header';
import Auth from './components/Auth';

const app = props => (
  <div className="App">
    <Header />
    <hr />
    <Todo />
    <Auth />
  </div>
);

export default app;
