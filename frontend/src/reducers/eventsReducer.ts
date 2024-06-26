import { createSlice, current } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import eventService from "../services/eventService";
import { Event, NewEventForm } from "../utils/types";
import { AppDispatch } from "../utils/store";

const initialState: Event[] = [];

const eventsSlice = createSlice({
  name: "events",
  initialState,
  reducers: {
    setEvents(_state, action: PayloadAction<Event[]>) {
      // console.log("initializing events");
      return action.payload;
    },
    addEvent(state, action) {
      // console.log("addEvent", action.payload);
      state.push(action.payload);
    },
    updateEvent(state, action) {
      const newState = state.map((e) =>
        e.id === action.payload.id ? action.payload : e
      );
      return newState;
    },
  },
});

export const { setEvents, addEvent, updateEvent } = eventsSlice.actions;

export const getAllEvents = () => {
  return async (dispatch: AppDispatch) => {
    const result = await eventService.getAll();
    dispatch(setEvents(result));
  };
};

export const createEvent = (payload: NewEventForm) => {
  return async (dispatch: AppDispatch) => {
    const result = await eventService.addOne(payload);
    dispatch(addEvent(result));
  };
};

export const handleRequestToJoinEvent = (eventId: string) => {
  return async (dispatch: AppDispatch) => {
    const result = await eventService.updateEventAttendance(eventId, {
      type: `request-to-join`,
    });
    dispatch(updateEvent(result));
  };
};
export const handleWithdrawRequestToJoinEvent = (eventId: string) => {
  return async (dispatch: AppDispatch) => {
    const result = await eventService.updateEventAttendance(eventId, {
      type: `withdraw-request-to-join`,
    });
    dispatch(updateEvent(result));
  };
};

export const handleAcceptRequestToJoinEvent = (
  eventId: string,
  requestedUserId: string
) => {
  return async (dispatch: AppDispatch) => {
    const result = await eventService.updateEventAttendance(eventId, {
      type: `accept-request-to-join`,
      requestedUserId: requestedUserId,
    });
    console.log("accept-request-to-join: ", result);
    dispatch(updateEvent(result));
  };
};

export const handleRejectRequestToJoinEvent = (
  eventId: string,
  requestedUserId: string
) => {
  return async (dispatch: AppDispatch) => {
    const result = await eventService.updateEventAttendance(eventId, {
      type: `reject-request-to-join`,
      requestedUserId: requestedUserId,
    });
    console.log("reject-request-to-join: ", result);
    dispatch(updateEvent(result));
  };
};

export default eventsSlice.reducer;
