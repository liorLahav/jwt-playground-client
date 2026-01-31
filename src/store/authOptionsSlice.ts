import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { IAuthOptions } from '../types/login';

const initialState: IAuthOptions = {
  userName: '',
  password: '',
  storedLocation: 'localStorage',
  alg: 'HS256',
  exp: true,
  sameSite: 'strict',
  secure: false,
  httpOnly: false,
};

const authOptionsSlice = createSlice({
  name: 'authOptions',
  initialState,
  reducers: {
    updateAuthOptions: (state, action: PayloadAction<Partial<IAuthOptions>>) => {
      return { ...state, ...action.payload };
    },
    resetAuthOptions: () => initialState,
  },
});

export const { updateAuthOptions, resetAuthOptions } = authOptionsSlice.actions;
export default authOptionsSlice.reducer;