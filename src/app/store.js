import { configureStore } from '@reduxjs/toolkit'
import flightsReducer from './flightsSlice'

export default configureStore({
  reducer: {
    flights: flightsReducer
  }
})
