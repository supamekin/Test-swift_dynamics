import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type UserFormState = {
  antecedent: string;
  name: string;
  lastName: string;
  birthdate: string;
  nationality: string;
  idCardNumber: string;
  sex: string;
  phoneNumber: number|string;
  passport: string;
  expectedSalary: number|string;
}

const initialState: UserFormState = {
  antecedent: '',
  name: '',
  lastName: '',
  birthdate: '',
  nationality: '',
  idCardNumber: '',
  sex: '',
  phoneNumber: '',
  passport: '',
  expectedSalary: '',
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
      state.idCardNumber = '';
      state.sex = '';
      state.phoneNumber = '';
      state.passport = '';
      state.expectedSalary = '';
    },
  },
});


export const { setField, resetForm } = userFormSlice.actions;

export const selectUserForm = (state: { userForm: UserFormState }) => state.userForm;

export default userFormSlice.reducer;
