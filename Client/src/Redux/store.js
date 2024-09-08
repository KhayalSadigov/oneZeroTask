import { configureStore } from '@reduxjs/toolkit'
import categoriesReducer from './Slice/categoriesSlice'

export const store = configureStore({
  reducer: {
    categories: categoriesReducer,
  },
})