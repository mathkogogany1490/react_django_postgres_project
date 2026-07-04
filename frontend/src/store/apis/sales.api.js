import {rootApi} from "./root.api.js";


export const salesAllGetApi = async () => {
    try{
        const response = await rootApi.get("/sales/")
        return response.data
    }
    catch(error){
        return error
    }
}


export const salesGetApi = async (id) => {
    try{
        const response = await rootApi.get(`/sales/${id}/`)
        return response.data
    }
    catch(error){
        return error
    }
}

export const salesPostApi = async (dataObj) => {
    try{
        const response = await rootApi.post("/sales/",dataObj)
        return response.data
    }
    catch(error){
        return error
    }
}

export const salesPutApi = async (dataObj) => {
    try{
        const response = await rootApi.put(`/sales/${dataObj.id}/`,dataObj)
        return response.data
    }
    catch(error){
        return error
    }
}

export const salesDeleteApi = async (id) => {
    try{
        await rootApi.delete(`/sales/${id}/`)
        return id
    }
    catch(error){
        return error
        //sdsdfsdf
    }
}