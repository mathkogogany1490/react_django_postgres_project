import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { 
    employeeAllGetApi, 
    employeePostApi, 
    employeePutApi,
    employeeDeleteApi
        } from "../apis/employee.api";


export const employeeAllGetSlice = createAsyncThunk(
    "employeeAllGetSlice",
    async (_, thunkAPI) => {
        try{
            return await employeeAllGetApi();
        }
        catch(error){
            return thunkAPI.rejectWithValue(error.message)
        }
    }
)

export const employeePostSlice = createAsyncThunk(
    "employeePostSlice",
    async (dataObj, thunkAPI) => {
        try{
            return await employeePostApi(dataObj);
        }
        catch(error){
            return thunkAPI.rejectWithValue(error.message)
        }
    }
)

export const employeePutSlice = createAsyncThunk(
    "employeePutSlice",
    async (dataObj, thunkAPI) => {
        try{
            return await employeePutApi(dataObj);
        }
        catch(error){
            return thunkAPI.rejectWithValue(error.message)
        }
    }
)

export const employeeDeleteSlice = createAsyncThunk(
    "employeeDeleteSlice",
    async (id, thunkAPI) => {
        try{
            return await employeeDeleteApi(id);
        }
        catch(error){
            return thunkAPI.rejectWithValue(error.message)
        }
    }
)


const initialEmp = {
  id: '', name: '', email: '', job: '', pay:''
}
const initialState = {
  empTable: [],
  emp: initialEmp,
  mode: '',
  selectedId: "",
  loading: false,
  error: null
}

const employeeSlice = createSlice({
    name: "employeeSlice",
    initialState,
    reducers:{
        select: (state, action) => {
            state.selectedId = action.payload
        },
        setEmp: (state, action) => {
            state.emp = action.payload
        },
        remove: (state) => {
            state.empTable = state.empTable.filter(emp=>(
                emp.id !== state.selectedId
            ))
        },
        SetMode: (state,action) => {
            state.mode = action.payload
        }

    },
    extraReducers: (builder) => {
        builder 
            .addCase(employeeAllGetSlice.pending, (state) => {
                state.loading = true
                state.error = null
        }) 
            .addCase(employeeAllGetSlice.fulfilled, (state,action) => {
                state.empTable = action.payload
                state.loading = false
        }) 
            .addCase(employeeAllGetSlice.rejected, (state,action) => {
                state.loading = false
                state.error = action.payload
        }) 
            .addCase(employeePostSlice.fulfilled, (state,action) => {
                state.empTable = [...state.empTable, action.payload]
                state.loading = false
        })
            .addCase(employeePutSlice.fulfilled, (state,action) => {
                state.empTable = state.empTable.map(emp=>(
                        emp.id === state.selectedId ?
                        action.payload : emp
                    )
                )
                state.loading = false
        })
            .addCase(employeeDeleteSlice.fulfilled, (state,action) => {
                state.empTable = state.empTable.filter(emp=>(
                emp.id !== state.selectedId
            ))
                state.loading = false
        })  
    }
})
export const {SetMode, remove, register, update, select, setEmp } = employeeSlice.actions;
export default employeeSlice.reducer;