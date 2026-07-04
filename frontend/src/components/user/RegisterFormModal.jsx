import React, { useState } from 'react'
import { Modal, Input , Typography} from 'antd';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { useRegisterUser } from '../../store/hooks/useUser';

const {Title} = Typography;

const initialState = {
  username: "",
  password: "",
  confirmPassword: "",
  age: "",
  email: "",
  city: ""
}

const RegisterForm = ({open, setOpen}) => {
  const [user, setUser] = useState(initialState);
  const registerMutation = useRegisterUser()
  const navigate = useNavigate();
  const handleChange = (event) => {
    const { name, value } = event.target;
    setUser(prev => ({
      ...prev,
      [name]: value
    }))
  }
  const handleRegister = async () => {
    const {
      username, 
      password,
      confirmPassword,
      email
    } = user
    if(!username.trim()){
      alert("아이디를 입력하세요.")
      return;
    }
    if(!password.trim()){
      alert("비밀번호를 입력하세요.")
      return;
    }
    if (password !== confirmPassword) {
      alert("비밀번호가 일치하지 않습니다.");
      return;
    }
    if(!email.trim()){
      alert("이메일을 입력하세요.")
      return;
    }
    
    const { confirmPassword:_ , ...userData } = user;
    try{
      registerMutation.mutateAsync(userData)
      alert("회원가입 성공")
      setOpen(false)
      setUser(initialState)
      navigate("/")
    }catch(error){
      alert(error?.message || "회원가입 실패")
    }
  }

  return (

    <>
      <Modal
        open={open}
        onOk={handleRegister}
        onCancel={()=>setOpen(false)}
        okText="회원가입"
        cancelText="취소"
        confirmLoading={registerMutation.isPending}
        width={500}
        centered
      >
        <Wrapper>
          <Title>회원가입</Title>

          <Description>
            새로운 계정을 생성하세요.
          </Description>

          <InputGroup>
            <Label>아이디</Label>

            <Input
              type="text"
              name="username"
              value={user.username}
              onChange={handleChange}
              placeholder="아이디 입력"
            />
          </InputGroup>

          <InputGroup>
            <Label>비밀번호</Label>

            <Input
              type="password"
              name="password"
              value={user.password}
              onChange={handleChange}
              placeholder="비밀번호 입력"
            />
          </InputGroup>

          <InputGroup>
            <Label>비밀번호 확인</Label>

            <Input
              type="password"
              name="confirmPassword"
              value={user.confirmPassword}
              onChange={handleChange}
              placeholder="비밀번호 다시 입력"
            />
          </InputGroup>
          <InputGroup>
            <Label>나이</Label>

            <Input
              type="number"
              name="age"
              value={user.age}
              onChange={handleChange}
              placeholder="나이 입력"
            />
          </InputGroup>
          <InputGroup>
            <Label>이메일</Label>

            <Input
              type="email"
              name="email"
              value={user.email}
              onChange={handleChange}
              placeholder="이메일 입력"
            />
          </InputGroup>
          <InputGroup>
            <Label>도시</Label>
            <Input
              type="text"
              name="city"
              value={user.city}
              onChange={handleChange}
              placeholder="도시 입력"
            />
          </InputGroup>
        </Wrapper>
      </Modal>
    
    </>
   
  )
}

export default RegisterForm;

const Wrapper = styled.div`
  padding: 10px 0;
`

const Description = styled.p`
  text-align: center;
  color: #64748b;
  font-size: 15px;
  margin-bottom: 32px;
`
const InputGroup = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 20px;
`
const Label = styled.label`
  font-size: 14px;
  font-weight: 600;
  color: #334155;
  margin-bottom: 8px;
`


