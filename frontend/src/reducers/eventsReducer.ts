import { createSlice, current } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import eventsService from "../services/eventService";
import { AppDispatch, Event } from "../utils/types";

const initialState: Event[] = [];

const eventsSlice = createSlice({
  name: "events",
  initialState,
  reducers: {
    setEvents(_state, action: PayloadAction<Event[]>) {
      console.log("initializing events");
      return action.payload;
    },
  },
});

export const {
  setEvents,
  // addBlog, updateBlog, removeBlog
} = eventsSlice.actions;

export const getAllEvents = () => {
  return async (dispatch: AppDispatch) => {
    const result = await eventsService.getAll();
    dispatch(setEvents(result));
  };
};

export default eventsSlice.reducer;
