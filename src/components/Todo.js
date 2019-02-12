import React, { useState, useEffect, useReducer, useRef, useMemo } from 'react';
import axios from 'axios';

import List from './List';

const Todo = props => {
  const [inputIsValid, setInputIsValid] = useState(false);
  // ! Seperated useStates
  // const [todoName, setTodoName] = useState('');
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
  }, []);

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

  const inputValidationHandler = event => {
    if (event.target.value.trim() === '') {
      setInputIsValid(false);
    } else {
      setInputIsValid(true);
    }
  };

  // const [todoState, setTodoState] = useState({ userInput: '', todoList: [] });

  // useEffect(() => {
  //   if (submittedTodo) {
  //     dispatch({ type: 'ADD', payload: submittedTodo });
  //   }
  // }, [submittedTodo]);

  // const inputChangeHandler = event => {
  //   // setTodoState({
  //   //   userInput: event.target.value,
  //   //   todoList: todoState.todoList
  //   // });
  //   setTodoName(event.target.value);
  // };

  const todoAddHandler = () => {
    // setTodoState({
    //   userInput: todoState.userInput,
    //   todoList: todoState.todoList.concat(todoState.userInput)
    // });

    const todoName = todoInputRef.current.value;

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
        ref={todoInputRef}
        onChange={inputValidationHandler}
        style={{ backgroundColor: inputIsValid ? 'transparent' : 'red' }}
      />
      <button type="button" onClick={todoAddHandler}>
        Add
      </button>
      <button type="button" onClick={todoClearHandler}>
        Clear
      </button>
      {useMemo(
        () => (
          <List items={todoList} onClick={todoRemoveHandler} />
        ),
        [todoList]
      )}
    </React.Fragment>
  );
};

export default Todo;
