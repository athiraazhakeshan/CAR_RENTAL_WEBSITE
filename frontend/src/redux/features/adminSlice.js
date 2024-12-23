import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  admin: {},
  userAutherized:false
}

export const adminSlice = createSlice({
  name: 'admin',
  initialState,
  reducers: {
    saveUser: (state,action) => {
      state.admin=action.payload;
      state.userAutherized=true
    },
    clearUser: (state) => {
      state.admin={};
      state.userAutherized=false
    },

  },
})

// Action creators are generated for each case reducer function
export const { saveUser,clearUser } = adminSlice.actions

export default adminSlice.reducer;