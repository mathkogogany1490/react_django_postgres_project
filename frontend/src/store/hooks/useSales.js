import { useQuery } from "@tanstack/react-query";
import { useAllGetUser } from "./useUser";
import { useAllGetProduct } from "./useProduct";
import { salesAllGetApi } from "../apis/sales.api";
import { useMemo } from "react";

export const useAllGetSales = () => {
  return useQuery({
    queryKey: ["sales"],
    queryFn: salesAllGetApi,
  });
};

export const useGetSales = () => {
  const { data: userList = [] } = useAllGetUser();
  const { data: productList = [] } = useAllGetProduct();
  const { data: salesList = [] } = useAllGetSales();
  
  const rowData = useMemo(() => {
    const userObj = userList && Object.fromEntries(
      userList?.map((item) => [item.id, item])
    );

    const productObj = Object.fromEntries(
      productList?.map((item) => [item.id, item])
    );

    return salesList.map((item) => ({
      ...item,
      user_name:
        userObj[item.user_id]?.username ?? "알수없음",
      product_name:
        productObj[item.product_id]?.product_name ?? "알수없음",
    }));
  }, [userList, productList, salesList]);

  return rowData;
};