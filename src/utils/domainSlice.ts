import { createSlice } from "@reduxjs/toolkit";

const domainSlice = createSlice({
  name: "domainName",
  initialState: {
    domainName: "",
  },
  reducers: {
    addDomainName: (state, action) => {
      state.domainName = action.payload;
    },
    removeDomainName: (state) => {
      state.domainName = "";
    },
  },
});

export const domainSliceReducer = domainSlice.reducer;
export const { addDomainName, removeDomainName } = domainSlice.actions;
