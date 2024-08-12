// store/store.ts
import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authSlice';
import navReducer from './navSlice';

const store = configureStore({
  reducer: {
    auth: authReducer,
    nav: navReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
