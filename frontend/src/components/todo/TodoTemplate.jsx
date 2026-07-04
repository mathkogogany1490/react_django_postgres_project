import React from 'react'
import styled from 'styled-components'

const TodoTemplate = ({children}) => {
  return (
    <Container>
        <HeaderTitle>일정관리</HeaderTitle>
        <Content>
            {children}
        </Content>
    </Container>
  )
}

export default TodoTemplate

const Container = styled.div`
  max-width: 600px;
  margin: 0 auto;
  background: white;
  border-radius: 20px;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.05);
  overflow: hidden;
  border: 1px solid #e2e8f0;
`;

const HeaderTitle = styled.div`
  background: #3b82f6;
  color: white;
  font-size: 20px;
  font-weight: 700;
  padding: 24px;
  text-align: center;
  letter-spacing: 0.5px;
`;

const Content = styled.div`
  padding: 32px 24px;
  background: #ffffff;
`;