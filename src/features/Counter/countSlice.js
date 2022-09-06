import { createSlice } from "@reduxjs/toolkit";
// mỗi features là một countslice.js
// sau đó setup store dưới foder app
// sau đó gắn store vào app nhờ react redux
const counterSlice = createSlice({
  name: "counter",
  initialState: 0,
  reducers: {
    increase(state) {
      return state + 1;
    },
    decrease(state) {
      return state - 1;
    },
  },
});

const { actions, reducer } = counterSlice;
export const { increase, decrease } = actions; //name expost
export default reducer; // export default
