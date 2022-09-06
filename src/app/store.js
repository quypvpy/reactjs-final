import counterReducer from "../features/Counter/countSlice";
import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../features/Auth/userSlice";
const rootReducer = {
  // rootReducer là bao gồm tất cả reducer mình có
  // counterReducer tên mình đặt nhưng trên mình impport từ hàm couterslice nên nó gắn vào counterReducer
  // và cái reducer này có state là một con số thôi ( 0 )
  count: counterReducer,
  user: userReducer,
};
const store = configureStore({
  reducer: rootReducer,
});
export default store;
