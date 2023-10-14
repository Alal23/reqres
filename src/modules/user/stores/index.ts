import {createSlice} from '@reduxjs/toolkit';
import initialState from './userInititalState';

const UserSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    UserGetData: (state, action) => ({
      ...state,
      userList: action.payload,
      action: action.type,
    }),
    UserAddData: (state, action) => ({
      ...state,
      userList: [...state.userList, action.payload],
      action: action.type,
    }),
    UserUpdateData: (state, action) => ({
      ...state,
      userList: state.userList.map(item =>
        item.id === action.payload.id ? {...item, ...action.payload} : item,
      ),
      action: action.type,
    }),
    UserDeleteData: (state, action) => ({
      ...state,
      userList: state.userList.filter(item => item.id !== action.payload),
      action: action.type,
    }),
  },
});

export const {name, actions, reducer} = UserSlice;
