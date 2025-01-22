import { createSlice } from "@reduxjs/toolkit";

const requestSlice = createSlice({
  name: "requests",
  initialState: [], // or use an empty array [] if managing multiple requests
  reducers: {
    addRequests: (state, action) => {
      return action.payload; // Update the state with the new payload
    },
    removeRequest:(state,action)=>{
      return state.filter(RequestItem => RequestItem._id !== action.payload);
    }
  },
});

export const { addRequests, removeRequest } = requestSlice.actions;
export default requestSlice.reducer;
