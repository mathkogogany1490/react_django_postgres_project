import React, { useEffect, useState } from 'react'
import styled from 'styled-components';
import {
  useGetEmployee,
  usePutUpdateEmployee
} from "../../store/hooks/useEmployee";

const EmployeeUpdate = ({selectedId}) => {

    const {data: emp, isLoading, error} = useGetEmployee(selectedId)
    const[newEmp,setNewEmp] = useState(emp);

    const updateMutation = usePutUpdateEmployee()
    useEffect(() =>{
      emp &&
      setNewEmp(emp)
    },[emp])
    const handleChange = (event) => {
      const{name,value} = event.target;
      setNewEmp(prev => (
        {...prev, [name]: value}
      ))
    }
    const handleSubmit = async (event) =>{
      event.preventDefault();
      try{
        await updateMutation.mutate(newEmp);
        alert("직원 정보가 수정되었습니다.");
      }catch{
        alert("직원 정보 수정 실패");
      }
    }
    if(isLoading) return <h3>loading...</h3>
    if(error) return <h3>{error.message}</h3>
    return (
      <FormContainer onSubmit={handleSubmit}>
        <FormTitle>직원 정보 수정</FormTitle>
          <>
            <FormGrid>
              <FormGroup>
                <Label>이름</Label>
                <Input
                  type="text"
                  name="name"
                  value={newEmp.name || ''}
                  onChange={handleChange}
                  placeholder="이름"
                  required
                />
              </FormGroup>
              <FormGroup>
                <Label>이메일</Label>
                <Input
                  type="email"
                  name="email"
                  value={newEmp.email || ''}
                  onChange={handleChange}
                  placeholder="이메일"
                  required
                />
              </FormGroup>
              <FormGroup>
                <Label>직업</Label>
                <Input
                  type="text"
                  name="job"
                  value={newEmp.job || ''}
                  onChange={handleChange}
                  placeholder="직업"
                  required
                />
              </FormGroup>
              <FormGroup>
                <Label>급여 (원)</Label>
                <Input
                  type="number"
                  name="pay"
                  value={newEmp.pay || ''}
                  onChange={handleChange}
                  placeholder="급여"
                  required
                />
              </FormGroup>
            </FormGrid>
            <SubmitButton type="submit">수정 완료</SubmitButton>
          </>
      </FormContainer>
    )
  }

  export default EmployeeUpdate

  const FormContainer = styled.form`
    display: flex;
    flex-direction: column;
    gap: 20px;
    background: #ffffff;
    padding: 8px 4px;
  `;

  const FormTitle = styled.h3`
    font-size: 18px;
    font-weight: 700;
    color: #1e293b;
    margin: 0 0 4px 0;
  `;

  const FormGrid = styled.div`
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 16px;

    @media (max-width: 600px) {
      grid-template-columns: 1fr;
    }
  `;

  const FormGroup = styled.div`
    display: flex;
    flex-direction: column;
    gap: 8px;
  `;

  const Label = styled.label`
    font-size: 13px;
    font-weight: 600;
    color: #475569;
  `;

  const Input = styled.input`
    padding: 12px 14px;
    font-size: 14px;
    border-radius: 8px;
    border: 1px solid #cbd5e1;
    outline: none;
    background: #f8fafc;
    transition: all 0.2s ease;

    &:focus {
      border-color: #3b82f6;
      background: #ffffff;
      box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.15);
    }
  `;

  const SubmitButton = styled.button`
    padding: 12px 24px;
    font-size: 15px;
    font-weight: 600;
    color: #ffffff;
    background: #3b82f6;
    border: none;
    border-radius: 8px;
    cursor: pointer;
    align-self: flex-start;
    transition: all 0.2s ease;

    &:hover {
      background: #2563eb;
      transform: translateY(-1px);
      box-shadow: 0 4px 12px rgba(37, 99, 235, 0.2);
    }

    &:active {
      transform: translateY(0);
    }
  `;

  const NoSelectionMessage = styled.p`
    font-size: 14px;
    color: #64748b;
    margin: 0;
    font-weight: 500;
    background: #f8fafc;
    padding: 24px;
    border-radius: 8px;
    text-align: center;
    border: 1px dashed #cbd5e1;
  `;

