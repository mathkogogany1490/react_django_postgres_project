import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

import {
    todoAllGetApi,
    todoGetApi,
    todoPostApi,
    todoPutApi,
    todoDeleteApi
} from "../apis/todo.api"

export const useAllGetTodo = () => {
    return useQuery({
        queryKey: ["todos"],
        queryFn: todoAllGetApi
    })
}

export const useGetTodo = (id) => {
    return useQuery({
        queryKey: ["todos", id],
        queryFn: () => todoGetApi(id),
        enabled: !!id
    })
}

export const usePostRegisterTodo = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: todoPostApi,
        onSuccess: (dataObj) =>{
            queryClient.setQueryData(
                ["todos"],
                (old=[]) =>[
                    ...old, dataObj
                ]
            )
            // 캐쉬 제거, 데이터 다시 불러오기기
            queryClient.invalidateQueries({
                queryKey: ["todos"]
            })
        }
    })
}

export const usePutUpdateTodo = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: todoPutApi,
        onSuccess: (dataObj) =>{
            queryClient.setQueryData(
                ["todos"],
                (old=[]) => old.map(item=>
                    item.id === dataObj.id ?
                    dataObj : item
                )
            );
            queryClient.invalidateQueries(
                ["todos", dataObj.id]
            );
        }
    })
}



export const useDeleteTodo = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: todoDeleteApi,
        onSuccess: (id) =>{
            queryClient.setQueryData(
                ["todos"],
                (old=[]) => old.filter(item=>
                    item.id !== id 
                )
            );
            queryClient.removeQueries(
                ["todos", id],
            );
        }
    })
}