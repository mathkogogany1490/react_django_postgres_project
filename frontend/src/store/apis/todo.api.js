import {rootApi} from "./root.api.js";

export const todoAllGetApi = async () => {
    try{
        const response = await rootApi.get("/todos/")
        return response.data
    }
    catch(error){
        return error
    }
}

export const todoGetApi = async (id) => {
    try{
        const response = await rootApi.get(`/todos/${id}/`)
        return response.data
    }
    catch(error){
        return error
    }
}

export const todoPostApi = async (dataObj) => {
    try{
        const response = await rootApi.post("/todos/", dataObj)
        return response.data
    }
    catch(error){
        return error
    }
}

export const todoPutApi = async (dataObj) => {
    try{
        const response = await rootApi.put(`/todos/${dataObj.id}/`, dataObj)
        return response.data
    }
    catch(error){
        return error
    }
}

export const todoDeleteApi = async (id) => {
    try{
        await rootApi.delete(`/todos/${id}/`)
        return id
    }
    catch(error){
        return error
    }
}