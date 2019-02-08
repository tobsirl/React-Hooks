import React, { useState } from 'react';

const Todo = props => {
  const inputState = useState('');

  const inputChangeHandler = event => {
    inputState[1](event.target.value);
  };

  return (
    <React.Fragment>
      <h3>Todo</h3>
      <input
        type="text"
        placeholder="Todo"
        onChange={inputChangeHandler}
        value={inputState[0]}
      />
      <button type="button">Add</button>
      <ul />
    </React.Fragment>
  );
};

export default Todo;
