import { configureStore } from '@reduxjs/toolkit'
import appSlice   from './appSlice'
import searchSlice from './searchSlice'
import chatSlice  from './chatSlice'
import authSlice  from './authSlice'

const store = configureStore({
  reducer: {
    app:    appSlice,
    search: searchSlice,
    chat:   chatSlice,
    auth:   authSlice,
  },
})

export default store
