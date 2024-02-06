import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type UserFormState = {
  antecedent: string;
  name: string;
  lastName: string;
  birthdate: string;
  nationality: string;
  idCardNumber: number;
  sex: string;
  phoneNumber: number;
  passport: string;
  expectedSalary: number;
}

const initialState: UserFormState = {
  antecedent: '',
  name: '',
  lastName: '',
  birthdate: '',
  nationality: '',
  idCardNumber: 0,
  sex: '',
  phoneNumber: 0,
  passport: '',
  expectedSalary: 0,
};

export const userFormSlice = createSlice({
  name: 'userForm',
  initialState,
  reducers: {
    setField: (state, action: PayloadAction<{ field: string; value: string }>) => {
      const { field, value } = action.payload;
      state[field] = value;
    },
    resetForm: (state) => {
      state.antecedent = '';
      state.name = '';
      state.lastName = '';
      state.birthdate = '';
      state.nationality = '';
      state.idCardNumber = 0;
      state.sex = '';
      state.phoneNumber = 0;
      state.passport = '';
      state.expectedSalary = 0;
    },
  },
});


export const { setField, resetForm } = userFormSlice.actions;

export const selectUserForm = (state: { userForm: UserFormState }) => state.userForm;

export default userFormSlice.reducer;
