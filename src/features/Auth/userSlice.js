import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import userApi from "../../api/userApi";
import StorageKeys from "../../constants/storage-keys";
// import userApi from "api/userApi";
// mỗi features là một countslice.js
// sau đó setup store dưới foder app
// sau đó gắn store vào app nhờ react redux

// First, create the thunk
export const register = createAsyncThunk("users/register", async (payload) => {
  //   call API to register
  // payload thoong tin user nhap tren form
  const data = await userApi.register(payload);
  // save data locastorege
  localStorage.setItem(StorageKeys.TOKEN, data.jwt);
  localStorage.setItem(StorageKeys.USER, JSON.stringify(data.user));
  // return user data
  return data.user;
});
// First, create the thunk
export const login = createAsyncThunk("users/login", async (payload) => {
  //   call API to register
  // payload thoong tin user nhap tren form
  const data = await userApi.login(payload);
  // save data locastorege
  localStorage.setItem(StorageKeys.TOKEN, data.jwt);
  localStorage.setItem(StorageKeys.USER, JSON.stringify(data.user));
  // return user data
  return data.user;
});

const userSlice = createSlice({
  name: "user",
  initialState: {
    current: JSON.parse(localStorage.getItem(StorageKeys.USER)) || {},
    settings: {},
  },
  reducers: {
    logout(state) {
      // clear local storage
      localStorage.removeItem(StorageKeys.USER);
      localStorage.removeItem(StorageKeys.TOKEN);
      state.current = {};
    },
  },
  extraReducers: {
    // 'user/register/fulfilled'
    [register.fulfilled]: (state, action) => {
      state.current = action.payload;
    },

    [login.fulfilled]: (state, action) => {
      state.current = action.payload;
    },
  },
});

const { actions, reducer } = userSlice;
export const { logout } = actions;
export default reducer; // export default
