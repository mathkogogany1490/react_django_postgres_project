import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

import {
    productAllGetApi,
    productGetApi,
    productPostApi,
    productPutApi,
    productDeleteApi
} from "../apis/product.api"

export const useAllGetProduct = () => {
    return useQuery({
        queryKey: ["product"],
        queryFn: productAllGetApi
    })
}

export const useGetProduct = (id) => {
    return useQuery({
        queryKey: ["product", id],
        queryFn: () => productGetApi(id),
        enabled: !!id
    })
}

export const usePostRegisterProduct = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: productPostApi,
        onSuccess: (dataObj) =>{
            queryClient.setQueryData(
                ["product"],
                (old=[]) =>[
                    ...old, dataObj
                ]
            )
            // 캐쉬 제거, 데이터 다시 불러오기기
            queryClient.invalidateQueries({
                queryKey: ["product"]
            })
        }
    })
}

export const usePutUpdateProduct = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: productPutApi,
        onSuccess: (dataObj) =>{
            queryClient.setQueryData(
                ["product"],
                (old=[]) => old.map(item=>
                    item.id === dataObj.id ?
                    dataObj : item
                )
            );
            queryClient.invalidateQueries(
                ["product", dataObj.id]
            );
        }
    })
}

export const useDeleteProduct = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: productDeleteApi,
        onSuccess: (id) =>{
            queryClient.setQueryData(
                ["product"],
                (old=[]) => old.filter(item=>
                    item.id !== id 
                )
            );
            queryClient.removeQueries(
                ["product", id],
            );
        }
    })
}