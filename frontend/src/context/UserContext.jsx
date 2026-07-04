import React, { Children, createContext, useReducer } from 'react'

export const UserContext = createContext();

const initialUsers = [
  {id: 1, username: "john", password: "1111"},
  {id: 2, username: "peter", password: "1111"},
  {id: 3, username: "susan", password: "1111"},
  {id: 4, username: "qwe", password: "123"},
]

const initalState = {
    users: initialUsers,
    username: '',
    isLogin: false
}

const reducer = (state,action) => {
    switch(action.type){
        case "login":
            return{
                ...state,
                isLogin:true,
                username:action.payload
            }
        case "logout":
            return{
                ...state,
                isLogin:false,
                username: ""
            }
            default:
                return state
        case "register":
            return{
                ...state,
                users:[
                    ...state.users,
                    {
                        id: action.payload.id,
                        username: action.payload.username,
                        password: action.payload.password
                    }
                ]
            }
        
    }
        
}

const UserProvider = ({children}) => {
    const [state,dispatch] = useReducer(reducer,initalState);
    return(
        <UserContext.Provider value={{state,dispatch}}>
            {children}
        </UserContext.Provider>
    )
}


export default UserProvider
