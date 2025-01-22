import { createSlice } from "@reduxjs/toolkit";

const feedSlice=createSlice({
    name:"feed",
    initialState:null,
    reducers:{
        addFeed: (state,action)=>{
            return action.payload;
        },
        deleteFeed: (state,action)=>{
            return state.filter(feedItem => feedItem._id !== action.payload); // Removes the item by ID
        }
    }
})

export const {addFeed, deleteFeed} =feedSlice.actions;
export default feedSlice.reducer;