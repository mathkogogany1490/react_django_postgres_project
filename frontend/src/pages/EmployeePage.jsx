// EmployeePage.jsx

import React, { useState } from "react";
import styled from "styled-components";
import EmployeeList from "../components/employee/EmployeeList";
import EmployeeTable from "../components/employee/EmployeeTable";
import EmployeeRegister from "../components/employee/EmployeeRegister";
import EmployeeUpdate from "../components/employee/EmployeeUpdate";
import { useDeleteEmployee } from "../store/hooks/useEmployee";

const EmployeePage = () => {
  const [selectedId, setSelectedId] = useState("");
  const [mode, setMode] = useState("register");
  const deleteMutation = useDeleteEmployee();
  const handleDelete = async () => {
    if (!selectedId) {
      alert("삭제할 데이터를 선택하세요");
      return;
    }
    try {
      await deleteMutation.mutate(selectedId);
      alert("직원 정보가 삭제되었습니다.");
      setSelectedId(null);
    } catch (error) {
      alert("직원 삭제 실패");
    }
  };

  return (
    <Container>
      <Title>Employee Management</Title>
      <Content>
        <LeftSection>
          <Card>
            <SectionTitle>직원 목록</SectionTitle>

            <EmployeeList
              selectedId={selectedId}
              setSelectedId={setSelectedId}
            />
          </Card>
        </LeftSection>

        <RightSection>
          <Card>
            <SectionTitle>직원 정보</SectionTitle>

            <EmployeeTable selectedId={selectedId} />
          </Card>

          <Card>
            <ButtonGroup>
              <ActionButton
                $active={mode === "register"}
                onClick={() => setMode("register")}
              >
                등록
              </ActionButton>

              <ActionButton
                $active={mode === "update"}
                onClick={() => {
                  if (!selectedId) {
                    alert("수정할 직원을 선택해 주세요.");
                    return;
                  }
                  setMode("update");
                }}
              >
                수정
              </ActionButton>

              <DeleteButton
                $active={mode === "delete"}
                onClick={() => setMode("delete")}
              >
                삭제
              </DeleteButton>
            </ButtonGroup>
            {mode === "register" ? (
              <EmployeeRegister />
            ) : mode === "update" ? (
              <EmployeeUpdate selectedId={selectedId} />
            ) : mode === "delete" ? (
              <DeleteBox>
                <p>⚠️ 선택한 직원의 데이터를 삭제하시겠습니까?</p>

                <DeleteConfirmButton onClick={handleDelete}>
                  삭제 확인
                </DeleteConfirmButton>
              </DeleteBox>
            ) : null}
          </Card>
        </RightSection>
      </Content>
    </Container>
  );
};

export default EmployeePage;

const Container = styled.div`
  width: 100%;
  min-height: 100vh;
  padding: 32px;
  background: #f8fafc;
`;

const Title = styled.h1`
  font-size: 28px;
  font-weight: 800;
  margin-bottom: 24px;
  color: #0f172a;
  letter-spacing: -0.02em;
`;

const Content = styled.div`
  display: flex;
  gap: 24px;

  @media (max-width: 900px) {
    flex-direction: column;
  }
`;

const LeftSection = styled.div`
  width: 280px;

  @media (max-width: 900px) {
    width: 100%;
  }
`;

const RightSection = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 24px;
`;

const Card = styled.div`
  background: white;
  border-radius: 16px;
  padding: 24px;
  box-shadow:
    0 4px 6px -1px rgba(0, 0, 0, 0.05),
    0 2px 4px -1px rgba(0, 0, 0, 0.03);
  border: 1px solid #f1f5f9;
`;

const SectionTitle = styled.h2`
  font-size: 18px;
  font-weight: 700;
  margin-bottom: 20px;
  color: #1e293b;
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 12px;
  margin-bottom: 20px;
`;

const ActionButton = styled.button`
  border: none;
  background: ${({ $active }) => ($active ? "#2563eb" : "#f1f5f9")};
  color: ${({ $active }) => ($active ? "#ffffff" : "#475569")};
  padding: 10px 20px;
  border-radius: 8px;
  cursor: pointer;
  font-weight: 600;
  font-size: 14px;
  transition: all 0.2s ease;

  &:hover {
    background: ${({ $active }) => ($active ? "#1d4ed8" : "#e2e8f0")};
    color: ${({ $active }) => ($active ? "#ffffff" : "#1e293b")};
  }
`;

const DeleteButton = styled.button`
  border: none;
  background: ${({ $active }) => ($active ? "#dc2626" : "#f1f5f9")};
  color: ${({ $active }) => ($active ? "#ffffff" : "#475569")};
  padding: 10px 20px;
  border-radius: 8px;
  cursor: pointer;
  font-weight: 600;
  font-size: 14px;
  transition: all 0.2s ease;

  &:hover {
    background: ${({ $active }) => ($active ? "#b91c1c" : "#fee2e2")};
    color: ${({ $active }) => ($active ? "#ffffff" : "#b91c1c")};
  }
`;

const DeleteBox = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  padding: 20px;
  background: #fef2f2;
  border: 1px solid #fecaca;
  border-radius: 12px;
  align-items: flex-start;

  p {
    margin: 0;
    color: #991b1b;
    font-weight: 600;
    font-size: 14px;
  }
`;

const DeleteConfirmButton = styled.button`
  border: none;
  background: #dc2626;
  color: white;
  padding: 10px 20px;
  border-radius: 8px;
  font-weight: 600;
  font-size: 14px;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background: #b91c1c;
    box-shadow: 0 4px 12px rgba(220, 38, 38, 0.25);
  }
`;
