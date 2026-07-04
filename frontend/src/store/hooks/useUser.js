import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import {
    userAllGetApi,
    userLoginApi,
    userRegisterApi,
    currentUserApi,
} from "../apis/user.api";

export const useAllGetUser = () => {
    return useQuery({
        queryKey: ["user"],
        queryFn: userAllGetApi
    });
};



export const useLoginUser = () => {

    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: userLoginApi,

        onSuccess: (data) => {

            localStorage.setItem("accessToken", data.access);
            localStorage.setItem("refreshToken", data.refresh);

            queryClient.invalidateQueries({
                queryKey: ["currentUser"],
            });
        },
    });
};

export const useCurrentUser = () => {
    return useQuery({
        queryKey: ["currentUser"],
        queryFn: currentUserApi,
        enabled: !!localStorage.getItem("accessToken"),
        retry: false,
    });
};

export const useRegisterUser = () => {
    return useMutation({
        mutationFn: userRegisterApi
    });
};

export const logout = () => {
    localStorage.removeItem("accessToken");
};