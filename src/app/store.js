import { configureStore } from '@reduxjs/toolkit'
import flightsReducer from './flightsSlice'
import { setAutoFreeze } from 'immer';

// Fixes "Cannot assign to read only property" error message
// when modifying objects from Redux state directly.
// https://github.com/reduxjs/redux-toolkit/issues/424
setAutoFreeze(false);
/* Ошибка возникала в src\app\flightsSlice.js из-за записи item.duration = ... Это не мутация стейта, а изменение
объекта входных данных ПЕРЕД его записью в стейт. Почему срабатывала ошибка, вроде как связанная с мутацией стейта, непонятно. */

export default configureStore({
  reducer: {
    flights: flightsReducer
  }
})
