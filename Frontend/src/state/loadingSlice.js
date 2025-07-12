import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoading: false,
  listLoading: false,
  detailsLoading: false,
  optionsLoading: false,
  modifyLoading: false,
};

const loadingSlice = createSlice({
  name: "loading",
  initialState,
  reducers: {
    setLoading(state, action) {
      state.isLoading = action.payload;
      // console.log("is this working --- Loading", action.payload);
    },
    setListLoading(state, action) {
      state.listLoading = action.payload;
    },
    setDetailsLoading(state, action) {
      state.detailsLoading = action.payload;
    },
    setOptionsLoading(state, action) {
      state.optionsLoading = action.payload;
    },
    setModifyLoading(state, action) {
      state.modifyLoading = action.payload;
    },
  },
});

export const {
  setLoading,
  setListLoading,
  setDetailsLoading,
  setOptionsLoading,
  setModifyLoading,
} = loadingSlice.actions;

export default loadingSlice.reducer;
export const selectIsLoading = (state) => state.loading.isLoading;
export const selectListLoading = (state) => state.loading.listLoading;
export const selectDetailsLoading = (state) => state.loading.detailsLoading;
export const selectOptionsLoading = (state) => state.loading.optionsLoading;
export const selectModifyLoading = (state) => state.loading.modifyLoading;
