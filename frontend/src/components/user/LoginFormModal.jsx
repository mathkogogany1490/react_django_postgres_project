import React, { useState } from 'react'
import { Modal, Input, Typography, Divider } from 'antd';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { useLoginUser } from '../../store/hooks/useUser';

const {Title, Text} = Typography;

const initialState = {
  username: "",
  password: ""
}

const LoginForm = ({open, setOpen}) => {
  const [user, setUser] = useState(initialState)
  const loginMutation = useLoginUser();
  const navigate = useNavigate();
  const handleChange = (event) => {
    const { name, value } = event.target;
    setUser(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleLogin = async () => {
    if(user.username.trim()===""){
      alert("이름을 넣어주세요!")
      return
    }
    if(user.password.trim()===""){
      alert("비밀번호를 넣어주세요!")
      return
    }
    try{
      await loginMutation.mutateAsync(user)
      alert("로그인 성공")
      setOpen(false)
      setUser(initialState)
      navigate("/")
    }catch(error){
      alert(error?.message || "로그인 실패")
    }

  }

  return (
    <>
      <Modal
        open={open}
        onOk={handleLogin}
        onCancel={()=>setOpen(false)}
        okText="로그인"
        cancelText="취소"
        confirmLoading={loginMutation.isPending}
        width={450}
        centered
      >
        <Wrapper>
          <Title style={{textAlign: "center"}}>로그인</Title>
          <Description>
            계정에 로그인하여 서비스를 이용하세요.
          </Description>
          <InputGroup>
            <Label>아이디</Label>
            <Input
              name="username"
              value={user.username}
              onChange={handleChange}
              placeholder="아이디 입력"
            />
          </InputGroup>
          <InputGroup>
            <Label>비밀번호</Label>
            <Input
              name="password"
              value={user.password}
              onChange={handleChange}
              placeholder="비밀번호 입력"
            />
          </InputGroup>
          <Divider />
          <RegisterButton
            type="button"
            onClick={() => {
               setOpen(false)
              navigate("/")
            }}
          >
            닫기
          </RegisterButton>
        </Wrapper>
      </Modal>
    </>
  )
}

export default LoginForm;

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


const BaseButton = styled.button`
  width: 100%;
  border: none;
  border-radius: 12px;
  padding: 14px;
  font-size: 15px;
  font-weight: 700;
  cursor: pointer;
  transition: 0.2s;
`



const RegisterButton = styled(BaseButton)`
  background: #eff6ff;
  color: #2563eb;

  &:hover{
    background: #dbeafe;
  }
`