import { createSlice } from "@reduxjs/toolkit";

const requestSlice = createSlice({
  name: "requests",
  initialState: null, // or use an empty array [] if managing multiple requests
  reducers: {
    addRequests: (state, action) => {
      return action.payload; // Update the state with the new payload
    },
  },
});

export const { addRequests } = requestSlice.actions;
export default requestSlice.reducer;
