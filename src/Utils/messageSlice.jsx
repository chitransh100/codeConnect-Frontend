import { createSlice } from "@reduxjs/toolkit";

const messageSlice=createSlice({
    name:"message",
    initialState:null,
    reducers:{
        addMessage:(state,action)=>{
            return action.payload
        }
    }
})
export const {addMessage}=messageSlice.reducer;
export default messageSlice.reducer;
