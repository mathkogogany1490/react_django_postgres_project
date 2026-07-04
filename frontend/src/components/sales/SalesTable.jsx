import React from "react";
import styled from "styled-components";
import { AgGridReact } from "ag-grid-react";
import { useGetSales } from "../../store/hooks/useSales";

const SalesTable = () => {
  const rowData = useGetSales();

  const columnDefs = [
    { field: "id", headerName: "주문번호", flex: 1 },
    { field: "user_name", headerName: "회원명", flex: 1.2 },
    { field: "product_name", headerName: "상품명", flex: 1.5 },
    { field: "quantity", headerName: "수량", flex: 1 },
    { field: "discount_rate", headerName: "할인율", flex: 1 },
    { field: "total_price", headerName: "결제금액", flex: 1.2 },
    { field: "created_at", headerName: "주문일자", flex: 1.2 },
  ];

  return (
    <Container>
      <Header>
        <Title>📊 판매 내역</Title>
        <Count>총 {rowData.length}건</Count>
      </Header>

      <GridWrapper className="ag-theme-alpine">
        <AgGridReact
          theme="legacy"
          rowData={rowData}
          columnDefs={columnDefs}
          pagination={true}
          paginationPageSize={14}
          animateRows={true}
        />
      </GridWrapper>
    </Container>
  );
};

export default SalesTable;

const Container = styled.div`
  width: 100%;
  padding: 24px;
  background: #f5f7fa;
  border-radius: 16px;
  box-sizing: border-box;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
`;

const Title = styled.h2`
  margin: 0;
  font-size: 24px;
  font-weight: 700;
  color: #1f2937;
`;

const Count = styled.div`
  padding: 8px 16px;
  background: #2563eb;
  color: white;
  border-radius: 20px;
  font-size: 14px;
  font-weight: 600;
`;

const GridWrapper = styled.div`
  width: 100%;
  height: 700px;
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);

  .ag-root-wrapper {
    border: none;
  }

  .ag-header {
    font-size: 15px;
    font-weight: 700;
  }

  .ag-header-cell-label {
    justify-content: center;
  }

  .ag-cell {
    display: flex;
    align-items: center;
  }

  .ag-row:hover {
    background-color: #f1f5f9;
    cursor: pointer;
  }

  .ag-paging-panel {
    height: 50px;
  }
`;
