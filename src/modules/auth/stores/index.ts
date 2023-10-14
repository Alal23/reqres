import {createSlice} from '@reduxjs/toolkit';
import initialState from './authInitialState';

const AuthSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    AuthSetToken: (state, action) => ({
      ...state,
      token: action.payload,
      action: action.type,
    }),
    AuthReset: () => ({
      ...initialState,
    }),
  },
});

export const {name, actions, reducer} = AuthSlice;
