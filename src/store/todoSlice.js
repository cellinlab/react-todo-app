import { createSlice } from '@reduxjs/toolkit'

import { getLSItem, setLSItem, uid } from '../util'

const getInitTodo = () => {
  const localTodoList = getLSItem('todoList');
  if (localTodoList) {
    return localTodoList;
  }
  setLSItem('todoList', []);
  return [];
};

const initialState = {
  filter: 'all',
  todoList: getInitTodo(),
};

const todoSlice = createSlice({
  name: 'todo',
  initialState,
  reducers: {
    addTodo: (state, action) => {
      state.todoList.push(action.payload);
      const todoList = getLSItem('todoList');
      let newTodoList = [];
      if (todoList) {
        newTodoList = [...todoList, { ...action.payload }];
      } else {
        newTodoList = [{ ...action.payload }];
      }
      setLSItem('todoList', newTodoList);
    },
    updateTodo: (state, action) => {
      const todoList = getLSItem('todoList');
      if (todoList) {
        const newTodoList = todoList.map((todo) => {
          if (todo.id === action.payload.id) {
            return { ...action.payload };
          }
          return todo;
        });
        state.todoList = newTodoList;
        setLSItem('todoList', newTodoList);
      }
    },
    removeTodo: (state, action) => {
      const todoList = getLSItem('todoList');
      if (todoList) {
        const newTodoList = todoList.filter((todo) => todo.id !== action.payload);
        state.todoList = newTodoList;
        setLSItem('todoList', newTodoList);
      }
    },
    updateFilter: (state, action) => {
      state.filter = action.payload;
    }
  }
});

export const { addTodo, updateTodo, removeTodo, updateFilter } = todoSlice.actions;

export default todoSlice.reducer;
