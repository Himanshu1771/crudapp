import { configureStore } from "@reduxjs/toolkit";
import PostReducer from "./todosSlice";

export const store = configureStore({
  reducer: {
    store: PostReducer,
  },
});