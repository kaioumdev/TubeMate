import { createSlice } from "@reduxjs/toolkit";

const chatSlice = createSlice({
    name: "chat",
    initialState: {
        message: [],
    },
    reducers: {
        addMessage: (state, action) => {
            state.message.push(action.payload)
        }
    }
})

export const { addMessage } = createSlice.actions;
export default chatSlice.reducer;