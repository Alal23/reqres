import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import initialState from './LibraryInitialState';

const Library = createSlice({
  name: 'Library',
  initialState,
  reducers: {
    onAddListPickUpBook: (state, action) => ({
      ...state,
      action: action.type,
      listBookPickUp: [...state.listBookPickUp, action.payload],
    }),
    onRemoveListPickUpBook: (state, action) => ({
      ...state,
      action: action.type,
      listBookPickUp: state.listBookPickUp.filter(
        (item, index) => index !== action.payload,
      ),
    }),
    onResetListPickUpBook: (state, action) => ({
      ...state,
      action: action.type,
      listBookPickUp: [],
    }),
  },
});

export const {name, actions, reducer} = Library;
