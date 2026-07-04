import { configureStore } from "@reduxjs/toolkit";
import todo from "./slices/todoSlice";
import user from "./slices/userSlice";
import emp from "./slices/employeeSlice";

const store = configureStore({
    reducer:{
        todo, user, emp
    }
})

export default store;