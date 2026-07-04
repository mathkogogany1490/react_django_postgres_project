import React, { useMemo, useState } from "react";
import styled from "styled-components";
import { AgGridReact } from "ag-grid-react";

import {
  useAllGetProduct,
  useDeleteProduct,
  usePostRegisterProduct,
  usePutUpdateProduct,
} from "../../store/hooks/useProduct";

import ProductModal from "./ProductModal";

const ProductTable = () => {
  const [open, setOpen] = useState(false);
  const [newProduct, setNewProduct] = useState(null);

  const {
    data: productList = [],
    isLoading,
    error,
  } = useAllGetProduct();

  const registerMutation = usePostRegisterProduct();
  const updateMutation = usePutUpdateProduct();
  const deleteMutation = useDeleteProduct();

  const handleRegister = () => {
    setNewProduct(null);
    setOpen(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm("정말 삭제하시겠습니까?")) {
      await deleteMutation.mutateAsync(id);
    }
  };

  const handleUpdate = (item) => {
    setNewProduct(item);
    setOpen(true);
  };

  const columnDefs = useMemo(
    () => [
      {
        field: "product_name",
        headerName: "상품명",
        flex: 1,
      },
      {
        field: "color",
        headerName: "색상",
        flex: 1,
      },
      {
        field: "price",
        headerName: "원가",
        flex: 1,
        valueFormatter: (params) =>
          Number(params.value).toLocaleString() + "원",
      },
      {
        field: "sale_price",
        headerName: "판매가",
        flex: 1,
        valueFormatter: (params) =>
          Number(params.value).toLocaleString() + "원",
      },
      {
        field: "product_category_code",
        headerName: "카테고리 코드",
        flex: 1,
      },
      {
        headerName: "상품 관리",
        flex: 1,

        cellRenderer: (params) => (
          <ButtonGroup>
            <EditButton
              onClick={() =>
                handleUpdate(params.data)
              }
            >
              수정
            </EditButton>

            <DeleteButton
              onClick={() =>
                handleDelete(params.data.id)
              }
            >
              삭제
            </DeleteButton>
          </ButtonGroup>
        ),
      },
    ],
    []
  );

  if (isLoading) {
    return <LoadingText>Loading...</LoadingText>;
  }

  if (error) {
    return (
      <ErrorText>
        {error?.message}
      </ErrorText>
    );
  }

  return (
    <PageWrapper>
      <Header>
        <Title>상품 관리</Title>
        <RegisterButton
          onClick={handleRegister}
        >
          + 상품 등록
        </RegisterButton>
      </Header>

      <GridWrapper>
        <div
          className="ag-theme-alpine"
          style={{
            height: "700px",
            width: "100%",
          }}
        >
          <AgGridReact
            theme="legacy"
            rowData={productList}
            columnDefs={columnDefs}
            pagination
            paginationPageSize={25}
            paginationPageSizeSelector={false}
            animateRows
            getRowId={(params) =>
              String(params.data.id)
            }
          />
        </div>
      </GridWrapper>

      <ProductModal
        open={open}
        setOpen={setOpen}
        initialValues={newProduct}
        onSubmit={async (productObj) => {
          if (newProduct) {
            await updateMutation.mutateAsync({
              ...productObj,
              id: newProduct.id,
            });
          } else {
            await registerMutation.mutateAsync(
              productObj
            );
          }
        }}
      />
    </PageWrapper>
  );
};

export default ProductTable;

/* ===========================
          STYLE
=========================== */

const PageWrapper = styled.div`
  padding: 24px;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  margin-bottom: 20px;
`;

const Title = styled.h2`
  margin: 0;

  font-size: 28px;
  font-weight: 700;

  color: #1f2937;
`;

const RegisterButton = styled.button`
  border: none;

  background: #1677ff;
  color: white;

  padding: 12px 20px;

  border-radius: 10px;

  font-size: 15px;
  font-weight: 600;

  cursor: pointer;

  transition: all 0.2s;

  &:hover {
    background: #4096ff;
    transform: translateY(-1px);
  }
`;

const GridWrapper = styled.div`
  background: white;

  padding: 20px;

  border-radius: 16px;

  box-shadow:
    0 4px 20px rgba(0, 0, 0, 0.08);

  overflow: hidden;
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 8px;

  justify-content: center;
  align-items: center;

  height: 100%;
`;

const EditButton = styled.button`
  border: none;

  background: #1677ff;
  color: white;

  padding: 6px 12px;

  border-radius: 6px;

  cursor: pointer;

  font-size: 13px;
  font-weight: 600;

  &:hover {
    background: #4096ff;
  }
`;

const DeleteButton = styled.button`
  border: none;

  background: #ff4d4f;
  color: white;

  padding: 6px 12px;

  border-radius: 6px;

  cursor: pointer;

  font-size: 13px;
  font-weight: 600;

  &:hover {
    background: #ff7875;
  }
`;

const LoadingText = styled.h3`
  text-align: center;
`;

const ErrorText = styled.h3`
  text-align: center;
  color: red;
`;