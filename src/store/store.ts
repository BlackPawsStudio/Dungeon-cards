import { combineReducers, configureStore } from '@reduxjs/toolkit';
import cardSlice from './cardsSlice';

const rootReducer = combineReducers({
  cardSlice: cardSlice
})

export const store = configureStore({
  reducer: rootReducer,
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch