import React, { useState } from 'react'
import styled from 'styled-components'
const initialEmp = {
   name: '', email: '', job: '', pay:''
}
import {
  usePostRegisterEmployee
} from "../../store/hooks/useEmployee";


const EmployeeRegister = () => {
    const[emp,setEmp] = useState(initialEmp);
    const registerMutation = usePostRegisterEmployee();
    const handleChange = (event) => {
      const{name,value} = event.target;
      setEmp(prev => (
        {...prev, [name]: value}
      ))
    }
    const handleSubmit = async (event) =>{
      event.preventDefault();
      try{
        await registerMutation.mutate(emp)
        setEmp(initialEmp)
        alert("직원 등록이 완료되었습니다.");
      }catch{
        alert("직원 등록 실패");
      }
      
    }
  return (
    <FormContainer onSubmit={handleSubmit}>
      <FormTitle>새 직원 등록</FormTitle>
      <FormGrid>
        <FormGroup>
          <Label>이름</Label>
          <Input
            type="text"
            name="name"
            value={emp.name}
            onChange={handleChange}
            placeholder="홍길동"
            required
          />
        </FormGroup>
        <FormGroup>
          <Label>이메일</Label>
          <Input
            type="email"
            name="email"
            value={emp.email}
            onChange={handleChange}
            placeholder="example@email.com"
            required
          />
        </FormGroup>
        <FormGroup>
          <Label>직업</Label>
          <Input
            type="text"
            name="job"
            value={emp.job}
            onChange={handleChange}
            placeholder="프론트엔드 개발자"
            required
          />
        </FormGroup>
        <FormGroup>
          <Label>급여 (원)</Label>
          <Input
            type="number"
            name="pay"
            value={emp.pay}
            onChange={handleChange}
            placeholder="3500000"
            required
          />
        </FormGroup>
      </FormGrid>
      <SubmitButton type="submit">등록하기</SubmitButton>
    </FormContainer>
  )
}

export default EmployeeRegister

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
  
  &::placeholder {
    color: #94a3b8;
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

