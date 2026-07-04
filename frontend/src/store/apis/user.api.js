import {rootApi} from "./root.api";

export const userAllGetApi = async ()=>{
    try{
        const response = await rootApi.get("/users/")
        return response.data
    }catch(error){
        return error
    }
}


export const userLoginApi = async (loginUser) => {
    try {
        const response = await rootApi.post(
            "/auth/login/",
            {
                username: loginUser.username,
                password: loginUser.password,
            }
        );
        return response.data;

    } catch (error) {
        throw new Error(
            error.response?.data?.detail ??
            "로그인에 실패했습니다."
        );
    }
};

// export const userLoginApi = async (loginUser) => {
//     try {
//         const response = await rootApi.get(
//             `/user?name=${loginUser.username}`
//         );
//         const users = response.data;
//         if (!users.length) {
//             throw new Error(
//                 "존재하지 않는 사용자입니다."
//             );
//         }
//         const foundUser = users[0];
//         if(foundUser.password !== loginUser.password ){
//             throw new Error(
//                 "비밀번호가 일치하지 않습니다."
//             );
//         }
//         return foundUser;
//     } catch (error) {
//         throw new Error(error.message);
//     }
// };

export const userRegisterApi = async (userObj) => {
    try {
        const response = await rootApi.post(
            "/users/",
            userObj
        );
        return response.data;
    } catch (error) {
        throw new Error(
            error.response?.data?.detail ??
            "회원가입에 실패했습니다."
        );
    }
};

// export const userRegisterApi = async (userObj)=>{
//     try{
//         const response = await rootApi.get(`/user?name=${userObj.username}`)
//         const users = response.data
//         if(users.length){
//             return Error("이미 존재하는 사용자입니다.")
//         }
//         return await rootApi.post(`/user`,userObj)
//     }catch(error){
//         return error
//     }
// }


export const currentUserApi = async () => {
    const response = await rootApi.get("/auth/me/");
    console.log(response.data);
    return response.data;
};



