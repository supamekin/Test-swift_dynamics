// src/app/store.tsx
import { configureStore } from '@reduxjs/toolkit';
import userFormReducer from '../features/register/userFormSlice';

export const store = configureStore({
  reducer: {
    userForm: userFormReducer,
  },
});
