import { createSlice } from "@reduxjs/toolkit";

const searchSlice = createSlice({
    name: "search",
    initialState: {},
    reducers: {
        cacheResults: (state, action) => {
            return state = { ...state, ...action.payload }
            // state = Object.assign(state, action.payload)
        }
    }
})

export const { cacheResults } = searchSlice.actions
export default searchSlice.reducer
// import { createSlice } from "@reduxjs/toolkit";

// const searchSlice = createSlice({
//     name: "search",
//     initialState: {
//         cache: {},
//         results: []
//     },
//     reducers: {
//         cacheResults: (state, action) => {
//             state.cache = { ...state.cache, ...action.payload };
//         },
//         setSearchResults: (state, action) => {
//             state.results = action.payload;
//         }
//     }
// });

// export const { cacheResults, setSearchResults } = searchSlice.actions;
// export default searchSlice.reducer;