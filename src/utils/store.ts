import { configureStore } from "@reduxjs/toolkit";
import { domainSliceReducer } from "./domainSlice";

const store = configureStore({
  reducer: {
    app: domainSliceReducer,
  },
});
export type RootState = ReturnType<typeof store.getState>;
export default store;
