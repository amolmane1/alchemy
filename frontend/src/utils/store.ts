import { configureStore } from "@reduxjs/toolkit";
import eventsReducer from "../reducers/eventsReducer";
import userReducer from "../reducers/userReducer";

const store = configureStore({
  reducer: {
    events: eventsReducer,
    user: userReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;

export default store;
