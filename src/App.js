import React, { Component } from 'react';

import Todo from './components/Todo';
import Header from './components/Header';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Header />
        <Todo />
      </div>
    );
  }
}

export default App;
