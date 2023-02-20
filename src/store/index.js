import { configureStore, createSlice } from "@reduxjs/toolkit";

const counterSlice = createSlice({
  name: "counter",
  initialState: { value: 0, isLoaded: true },
  reducers: {
    increment(state, action) {
      state.value += 1;
    },

    decrement(state, action) {
      state.value--;
    },

    addby(state, action) {
      state.value += action.payload;
    },
    loading(state, action) {
    
      state.isLoaded = !state.isLoaded;
    },
  },
});

export const incrementAsync = (amount) => (dispatch) => {
  dispatch(counterActions.loading());
  setTimeout(() => {
    dispatch(counterActions.addby(amount));
    dispatch(counterActions.loading());
  }, 2000);
 
};

const nameSlice = createSlice({
  name: "name",
  initialState: { name: "" },
  reducers: {
    onChange(state, action) {
      state.name = action.payload;
    },
  },
});

export const counterActions = counterSlice.actions;
export const nameActions = nameSlice.actions;

const store = configureStore({
  reducer: {
    counter: counterSlice.reducer,
    name: nameSlice.reducer,
  },
});
export default store;
