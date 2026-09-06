import { createSlice } from '@reduxjs/toolkit'

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: null,          // serialized Firebase user or null
    loading: true,       // true while Firebase resolves initial auth state
    error: null,
  },
  reducers: {
    setUser: (state, action) => {
      state.user    = action.payload
      state.loading = false
      state.error   = null
    },
    clearUser: (state) => {
      state.user    = null
      state.loading = false
      state.error   = null
    },
    setAuthLoading: (state, action) => {
      state.loading = action.payload
    },
    setAuthError: (state, action) => {
      state.error   = action.payload
      state.loading = false
    },
  },
})

export const { setUser, clearUser, setAuthLoading, setAuthError } = authSlice.actions
export default authSlice.reducer
