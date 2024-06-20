import { createSelector } from "@reduxjs/toolkit";
import {
  useAppSelector,
  // useAppDispatch
} from "../utils/hooks";
import EventCard from "./EventCard";
import { Event, EventFilter } from "../utils/types";

const EventsList = ({ searchFilters }: { searchFilters: EventFilter }) => {
  const filteredEventsSelector = createSelector(
    [(state) => state.events],
    (events) =>
      events.filter((e: Event) => {
        const statusCheck = e.status === "upcoming" || e.status === "ongoing";
        const locationCheck = e.location.includes(searchFilters.location);
        const textCheck =
          e.title.includes(searchFilters.text) ||
          e.description.includes(searchFilters.text) ||
          e.type.includes(searchFilters.text);
        return statusCheck && locationCheck && textCheck;
      })
  );
  const filteredEvents = useAppSelector(filteredEventsSelector);
  console.log(filteredEvents);
  return (
    <>
      {filteredEvents.map((e: Event) => (
        <EventCard key={e.id} event={e} />
      ))}
    </>
  );
};

export default EventsList;
