import React, { useState } from 'react';
import axios from 'axios';

const Todo = props => {
  // ! Seperated useStates
  const [todoName, setTodoName] = useState('');
  const [todoList, setTodoList] = useState([]);

  // const [todoState, setTodoState] = useState({ userInput: '', todoList: [] });

  const inputChangeHandler = event => {
    // setTodoState({
    //   userInput: event.target.value,
    //   todoList: todoState.todoList
    // });
    setTodoName(event.target.value);
  };

  const todoAddHandler = () => {
    // setTodoState({
    //   userInput: todoState.userInput,
    //   todoList: todoState.todoList.concat(todoState.userInput)
    // });
    setTodoList(todoList.concat(todoName));
    axios
      .post(`https://react-hooks-97ea6.firebaseio.com/todos.json`, {
        name: todoName
      })
      .then(res => {
        console.log(res);
      })
      .catch(err => {
        console.log(err);
      });
  };

  const todoClearHandler = () => {
    // setTodoState({ todoList: todoState.todoList.splice() });
    setTodoList(todoList.splice());
  };

  return (
    <React.Fragment>
      <h3>Todo</h3>
      <input
        type="text"
        placeholder="Todo"
        onChange={inputChangeHandler}
        value={todoName}
      />
      <button type="button" onClick={todoAddHandler}>
        Add
      </button>
      <button type="button" onClick={todoClearHandler}>
        Clear
      </button>
      <ul>
        {todoList.map(todo => (
          <li key={todo}>{todo}</li>
        ))}
      </ul>
    </React.Fragment>
  );
};

export default Todo;
