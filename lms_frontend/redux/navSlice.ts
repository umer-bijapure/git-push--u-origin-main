// store/navSlice.ts
import { createSlice } from '@reduxjs/toolkit';

interface NavState {
  color: string;
}

const initialState: NavState = {
  color: 'bg-gray-800', // Default color
};

const navSlice = createSlice({
  name: 'nav',
  initialState,
  reducers: {
    setNavColor: (state, action) => {
      state.color = action.payload;
    },
  },
});

export const { setNavColor } = navSlice.actions;
export default navSlice.reducer;
