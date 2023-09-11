// store.js
import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";
import logger from "redux-logger"; // Import redux-logger

const store = configureStore({
  reducer: {
    auth: authReducer,
    // Add other reducers here if needed
  },
  middleware: (getDefaultMiddleware) => [...getDefaultMiddleware()], //, logger],
});

export default store;
