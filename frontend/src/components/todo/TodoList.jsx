import React from "react";
import TodoListChild from "./TodoListChild";
import styled from "styled-components";
import { useAllGetTodo } from "../../store/hooks/useTodo";

const TodoList = () => {
  const { data: todoList = [], isLoading, error } = useAllGetTodo();

  if (isLoading) return <h3>loading...</h3>;
  if (error) return <h3>{error.message}</h3>;

  return (
    <ListContainer>
      {todoList?.map((item) => (
        <TodoListChild key={item.id} item={item} />
      ))}
    </ListContainer>
  );
};

export default TodoList;

const ListContainer = styled.div`
  display: flex; /* 레이아웃 정렬 */
  flex-direction: column; /* 세로 정렬 지정 */
  gap: 12px; /* 자식 요소들 간의 간격 여백 */
`;
