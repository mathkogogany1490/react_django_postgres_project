import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

import {
    employeeAllGetApi,
    employeeGetApi,
    employeePostApi,
    employeePutApi,
    employeeDeleteApi
} from "../apis/employee.api"

export const useAllGetEmployee = () => {
    return useQuery({
        queryKey: ["employees"],
        queryFn: employeeAllGetApi
    })
}

export const useGetEmployee = (id) => {
    return useQuery({
        queryKey: ["employees", id],
        queryFn: () => employeeGetApi(id),
        enabled: !!id
    })
}

export const usePostRegisterEmployee = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: employeePostApi,
        onSuccess: (dataObj) =>{
            queryClient.setQueryData(
                ["employees"],
                (old=[]) =>[
                    ...old, dataObj
                ]
            )
            // 캐쉬 제거, 데이터 다시 불러오기기
            queryClient.invalidateQueries({
                queryKey: ["employees"]
            })
        }
    })
}

export const usePutUpdateEmployee = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: employeePutApi,
        onSuccess: (dataObj) =>{
            queryClient.setQueryData(
                ["employees"],
                (old=[]) => old.map(item=>
                    item.id === dataObj.id ?
                    dataObj : item
                )
            );
            queryClient.invalidateQueries(
                ["employees", dataObj.id]
            );
        }
    })
}

export const useDeleteEmployee = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: employeeDeleteApi,
        onSuccess: (id) =>{
            queryClient.setQueryData(
                ["employees"],
                (old=[]) => old.filter(item=>
                    item.id !== id 
                )
            );
            queryClient.removeQueries(
                ["employees", id],
            );
        }
    })
}