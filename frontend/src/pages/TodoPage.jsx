import React from "react";
import TodoTemplate from "../components/todo/TodoTemplate";
import TodoInsert from "../components/todo/TodoInsert";
import TodoList from "../components/todo/TodoList";

const TodoPage = () => {
  return (
    <TodoTemplate>
      <TodoInsert />
      <TodoList />
    </TodoTemplate>
  );
};

export default TodoPage;
