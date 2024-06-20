import { configureStore } from "@reduxjs/toolkit";
import eventsReducer from "../reducers/eventsReducer";

const store = configureStore({
  reducer: {
    events: eventsReducer,
  },
});

export default store;
