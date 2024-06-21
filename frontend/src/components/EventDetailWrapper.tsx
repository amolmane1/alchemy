import { useParams } from "react-router-dom";
import { Event } from "../utils/types";
import { createSelector } from "@reduxjs/toolkit";
import { useAppSelector } from "../utils/hooks";
import EventDetail from "./EventDetail";

// check if event is null here. only render EventDetail if event is not null
const EventDetailWrapper = () => {
  let { id } = useParams();
  const eventSelector = createSelector([(state) => state.events], (events) =>
    events.find((e: Event) => e.id === id)
  );
  const event = useAppSelector(eventSelector);
  // console.log(event);

  if (event) {
    return <EventDetail event={event} />;
  } else {
    return <p>Loading event...</p>;
  }
};

export default EventDetailWrapper;
