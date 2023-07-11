import { configureStore } from '@reduxjs/toolkit';
import usersReducer from '../slice/users/usersSlice';

export const store = configureStore({
 reducer: {
  users: usersReducer,
 },
});
