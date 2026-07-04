import React from 'react'
import styled from 'styled-components';
import { useGetEmployee } from '../../store/hooks/useEmployee';

const EmployeeTable = ({selectedId}) => {
  const {data: emp, isLoading, error} = useGetEmployee(selectedId)
  if(isLoading) return <h3>loading...</h3>
  if(error) return <h3>{error.message}</h3>
  return (
    <TableWrapper>
        <StyledTable>
          <thead>
            <tr>
              {emp && Object.keys(emp).map(key => (
                <Th key={key}>{key}</Th>
              ))}
            </tr>
          </thead>
          <tbody>
            <Row>
              {emp && Object.values(emp).map(value => (
                <Td key={value}>{value}</Td>
              ))}
            </Row>
          </tbody>
        </StyledTable>
    </TableWrapper>
  )
}

export default EmployeeTable;

const TableWrapper = styled.div`
  width: 100%;
  overflow-x: auto;
  border-radius: 12px;
  border: 1px solid #e2e8f0;
  background: #ffffff;
`;

const StyledTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  text-align: left;
  min-width: 500px;
`;

const Th = styled.th`
  background: #f8fafc;
  padding: 16px 20px;
  font-size: 13px;
  font-weight: 700;
  color: #475569;
  border-bottom: 1px solid #e2e8f0;
  letter-spacing: 0.05em;
`;

const Td = styled.td`
  padding: 18px 20px;
  font-size: 14px;
  color: #334155;
  border-bottom: 1px solid #f1f5f9;
  font-weight: 500;
`;

const Row = styled.tr`
  background: white;
  transition: background-color 0.2s ease;
  
  &:hover {
    background: #f8fafc;
  }
`;

