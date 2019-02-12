import React, { useState, useEffect, useReducer, useRef } from 'react';
import axios from 'axios';

const Todo = props => {
  // ! Seperated useStates
  const [todoName, setTodoName] = useState('');
  // const [submittedTodo, setSubmittedTodo] = useState(null);
  // const [todoList, setTodoList] = useState([]);
  const todoInputRef = useRef();

  const todoListReducer = (state, action) => {
    switch (action.type) {
      case 'ADD':
        return state.concat(action.payload);
      case 'SET':
        return action.payload;
      case 'REMOVE':
        return state.filter(todo => todo.id !== action.payload);
      case 'REMOVEALL':
        return state.splice();
      default:
        return state;
    }
  };

  useEffect(() => {
    axios
      .get(`https://react-hooks-97ea6.firebaseio.com/todos.json`)
      .then(result => {
        console.log(result);

        const todoData = result.data;
        const todos = [];
        for (const key in todoData) {
          todos.push({ id: key, name: todoData[key].name });
        }
        dispatch({ type: 'SET', payload: todos });
      });
    return () => {
      console.log('Cleanup');
    };
  }, [todoName]);

  const keyDownHandler = event => {
    console.log(event.key);
  };

  const [todoList, dispatch] = useReducer(todoListReducer, []);

  useEffect(() => {
    document.addEventListener('keydown', keyDownHandler);
    return () => {
      document.removeEventListener('keydown', keyDownHandler);
    };
  }, []);

  // const [todoState, setTodoState] = useState({ userInput: '', todoList: [] });

  // useEffect(() => {
  //   if (submittedTodo) {
  //     dispatch({ type: 'ADD', payload: submittedTodo });
  //   }
  // }, [submittedTodo]);

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

    axios
      .post(`https://react-hooks-97ea6.firebaseio.com/todos.json`, {
        name: todoName
      })
      .then(res => {
        console.log(res);
        const todoItem = { id: res.data.name, name: todoName };
        dispatch({ type: 'ADD', payload: todoItem });
      })
      .catch(err => {
        console.log(err);
      });
  };

  const todoClearHandler = () => {
    // setTodoState({ todoList: todoState.todoList.splice() });
    dispatch({ type: 'REMOVEALL' });
  };

  const todoRemoveHandler = todoId => {
    axios
      .delete(`https://react-hooks-97ea6.firebaseio.com/todos/${todoId}.json`)
      .then(res => {
        dispatch({ type: 'REMOVE', payload: todoId });
      })
      .catch(err => console.log(err));
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
          <li key={todo.id} onClick={todoRemoveHandler.bind(this, todo.id)}>
            {todo.name}
          </li>
        ))}
      </ul>
    </React.Fragment>
  );
};

export default Todo;
