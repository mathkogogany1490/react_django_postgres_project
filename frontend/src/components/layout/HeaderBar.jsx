// HeaderBar.jsx
import React, { useState } from 'react'
import styled from 'styled-components'
import { useNavigate } from 'react-router-dom'
import { useCurrentUser, logout } from '../../store/hooks/useUser'
import LoginFormModal from '../user/LoginFormModal'
import RegisterFormModal from '../user/RegisterFormModal'
import {useQueryClient} from "@tanstack/react-query";

const HeaderBar = () => {
  const {data: user} = useCurrentUser();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [loginOpen, setLoginOpen] = useState(false);
  const [registerOpen, setRegisterOpen] = useState(false)
  const handleLogout = () => {
      logout()
      alert("로그아웃 되었습니다.")
      queryClient.removeQueries({
          queryKey: ["currentUser"]
      })
      navigate("/")
  }

  return (
    <>
      <Container>
        <Logo onClick={() => navigate("/")}>
          MySystem
        </Logo>
        <Menu>
          {user ?
            <UserSection>
              <UserName>
                {user.username}
              </UserName>
              <LogoutButton onClick={handleLogout}>
                로그아웃
              </LogoutButton>
            </UserSection>
            :
            <ButtonGroup>
              <LoginButton onClick={() => setLoginOpen(true)}>
                로그인
              </LoginButton>
              <RegisterButton onClick={() => setRegisterOpen(true)}>
                회원가입
              </RegisterButton>
            </ButtonGroup>
          }
        </Menu>
      </Container>
      <LoginFormModal
        open={loginOpen}
        setOpen={setLoginOpen}
      />
      <RegisterFormModal 
        open={registerOpen}
        setOpen={setRegisterOpen}
      />
    </>
    
  )
}

export default HeaderBar;


const Container = styled.header`

  width: 100%;
  height: 70px;

  background: #1e293b;

  display: flex;
  justify-content: space-between;
  align-items: center;

  padding: 0 32px;

  box-shadow: 0 2px 8px rgba(0,0,0,0.15);

  position: sticky;
  top: 0;

  z-index: 1000;

  @media (max-width: 768px){
    display: none;
  }
`;

const Logo = styled.div`

  font-size: 24px;
  font-weight: bold;

  color: #4dabf7;

  cursor: pointer;
  transition: 0.2s;
  &:hover{
    opacity: 0.8;
  }
`;

const Menu = styled.div`

  display: flex;
  align-items: center;
`;

const UserSection = styled.div`

  display: flex;
  align-items: center;

  gap: 14px;
`;

const UserName = styled.div`

  color: white;

  font-size: 15px;
  font-weight: 600;

  background: rgba(255,255,255,0.08);

  padding: 10px 14px;

  border-radius: 10px;
`;

const ButtonGroup = styled.div`

  display: flex;
  align-items: center;

  gap: 12px;
`;

const BaseButton = styled.button`

  border: none;
  outline: none;

  padding: 10px 16px;

  border-radius: 10px;

  cursor: pointer;

  font-size: 14px;
  font-weight: 600;

  transition: 0.2s;

  &:hover{
    transform: translateY(-1px);
  }
`;

const LoginButton = styled(BaseButton)`

  background: white;
  color: #1e293b;

  &:hover{
    background: #f1f5f9;
  }
`;

const RegisterButton = styled(BaseButton)`

  background: #3b82f6;
  color: white;

  &:hover{
    background: #2563eb;
  }
`;

const LogoutButton = styled(BaseButton)`

  background: #ef4444;
  color: white;

  &:hover{
    background: #dc2626;
  }
`;