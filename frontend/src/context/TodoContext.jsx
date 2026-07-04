import React, { createContext, useReducer } from 'react';

export const TodoContext = createContext();

const initialState = {
  todoList: [
    {id: 1, subject: "HTML 공부", checked: true},
    {id: 2, subject: "CSS 공부", checked: true},
    {id: 3, subject: "React 공부", checked: true},
    {id: 4, subject: "Python 공부", checked: true},
  ],
  todoObj: {id: "", subject: "", checked: false}
};

const todoReducer = (state, action) => {
  switch (action.type) {
    
    case 'CHANGE_INPUT':
      const { name, value } = action.payload;
      return {
        ...state, 
        todoObj: {
          ...state.todoObj, 
          [name]: value 
        }
      };
      
    case 'ADD_TODO':
      const newId = state.todoList.length > 0 ? Math.max(...state.todoList.map(item => item.id)) + 1 : 1;
      return {
        ...state, 
        todoList: [
          ...state.todoList, 
          {
            ...state.todoObj,
            id: newId 
          }
        ],
        todoObj: { id: "", subject: "", checked: false }
      };
      
    case 'DELETE_TODO':
      return {
        ...state,
        todoList: state.todoList.filter(item => item.id !== action.payload)
      };
      
    case 'TOGGLE_TODO':
      return {
        ...state, 
        todoList: state.todoList.map(todo =>
          todo.id === action.payload ? { ...todo, checked: !todo.checked } : todo
        )
      };
      
    case 'UPDATE_TODO':
      const { id, subject } = action.payload;
      return {
        ...state, 
        todoList: state.todoList.map(todo =>
          todo.id === id ? { ...todo, subject, checked: false } : todo
        )
      };
      
    default:
      return state;
  }
};

const TodoProvider = ({ children }) => {
  const [state, dispatch] = useReducer(todoReducer, initialState);

  return (
    <TodoContext.Provider value={{ state, dispatch }}>
      {children}
    </TodoContext.Provider>
  );
};

export default TodoProvider;
