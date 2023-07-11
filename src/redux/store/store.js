import { configureStore } from '@reduxjs/toolkit';
import usersReducer from '../slice/users/usersSlice';
import accountReducer from '../slice/account/accountSlice'
import transactionReducer from '../slice/transactions/transactionSlice'

export const store = configureStore({
 reducer: {
  users: usersReducer,
  accounts: accountReducer,
  transactions: transactionReducer,
 },
});
