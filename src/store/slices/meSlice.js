// dataSlice.js
import { createSlice } from '@reduxjs/toolkit';
import { useMeQuery } from './authSlice';

//const { data } = useMeQuery()

const initialState = {
  user: [
    'nam',
     'jjj',
  ],
};

const meSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    addData: (state, action) => {
      state.user.push(action.payload);
    },
    // Autres réducteurs et actions peuvent être définis ici
  },
});

export const { addUser } = meSlice.actions;
export default meSlice.reducer;
