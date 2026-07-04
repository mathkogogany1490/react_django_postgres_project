import React, { useState } from "react";
import {
  MdCheckBox,
  MdCheckBoxOutlineBlank,
  MdRemoveCircleOutline,
} from "react-icons/md";
import styled from "styled-components";
import { usePutUpdateTodo, useDeleteTodo } from "../../store/hooks/useTodo";

const TodoListChild = ({ item }) => {
  const updateMutation = usePutUpdateTodo();
  const deleteMutation = useDeleteTodo();

  const [editing, setEditing] = useState(false);
  const [todo, setTodo] = useState(item);

  const handleToggle = () => {
    try {
      setTodo((prev) => ({ ...prev, checked: !todo.checked }));
      updateMutation.mutateAsync({ ...todo, checked: !todo.checked });
      setEditing(false);
      alert("토글 성공");
    } catch {
      alert("토글 실패");
    }
  };

  const handleUpdate = () => {
    if (todo.subject.trim() !== "") {
      try {
        updateMutation.mutateAsync(todo);
        setEditing(false);
        alert("수정 성공");
      } catch {
        alert("수정 실패");
      }
    }
  };

  return (
    <TodoItem>
      {/* {console.log("todo", newTodo)} */}
      <CheckboxWrapper onClick={handleToggle}>
        {todo.checked ? <CheckedIcon /> : <UncheckedIcon />}
      </CheckboxWrapper>

      <TextWrapper>
        {editing ? (
          <EditInput
            type="text"
            name="subject"
            value={todo.subject}
            onChange={(e) =>
              setTodo((prev) => ({
                ...prev,
                [e.target.name]: e.target.value,
              }))
            }
            onBlur={handleUpdate}
            onKeyDown={(e) => {
              if (e.key === "Enter") handleUpdate();
            }}
            autoFocus
          />
        ) : (
          <TodoText
            $checked={todo.checked}
            onDoubleClick={() => {
              setTodo(item);
              setEditing(true);
            }}
          >
            {item.subject}
          </TodoText>
        )}
      </TextWrapper>

      <RemoveButton onClick={() => deleteMutation.mutateAsync(item.id)}>
        <MdRemoveCircleOutline size={20} />
      </RemoveButton>
    </TodoItem>
  );
};

export default TodoListChild;

const TodoItem = styled.div`
  display: flex;
  align-items: center;
  padding: 14px 18px;
  background: #f8fafc;
  border-radius: 12px;
  border: 1px solid #e2e8f0;
  transition: all 0.2s ease-in-out;

  &:hover {
    background: #f1f5f9;
    border-color: #cbd5e1;
    transform: translateX(2px);
  }
`;

const CheckboxWrapper = styled.div`
  cursor: pointer;
  display: flex;
  align-items: center;
  margin-right: 12px;
`;

const CheckedIcon = styled(MdCheckBox)`
  color: #3b82f6;
  font-size: 22px;
`;

const UncheckedIcon = styled(MdCheckBoxOutlineBlank)`
  color: #cbd5e1;
  font-size: 22px;

  &:hover {
    color: #94a3b8;
  }
`;

const TextWrapper = styled.div`
  flex: 1;
  min-width: 0;
`;

const TodoText = styled.div`
  font-size: 15px;
  font-weight: 500;
  color: ${({ $checked }) => ($checked ? "#94a3b8" : "#334155")};
  text-decoration: ${({ $checked }) => ($checked ? "line-through" : "none")};
  cursor: pointer;
  user-select: none;
  word-break: break-all;
`;

const EditInput = styled.input`
  width: 100%;
  border: none;
  background: transparent;
  border-bottom: 2px solid #3b82f6;
  font-size: 15px;
  font-weight: 500;
  color: #334155;
  outline: none;
  padding: 2px 0;
`;

const RemoveButton = styled.div`
  color: #94a3b8;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: color 0.2s ease;
  margin-left: 12px;

  &:hover {
    color: #ef4444;
  }
`;
