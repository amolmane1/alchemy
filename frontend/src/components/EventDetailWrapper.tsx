import { useParams } from "react-router-dom";
import { Event, User } from "../utils/types";
import { createSelector } from "@reduxjs/toolkit";
import { useAppSelector } from "../utils/hooks";
import EventDetail from "./EventDetail";
import { useEffect, useState } from "react";
import userService from "../services/userService";

// check if event is null here. only render EventDetail if event is not null
const EventDetailWrapper = () => {
  let { id } = useParams();
  const eventSelector = createSelector([(state) => state.events], (events) =>
    events.find((e: Event) => e.id === id)
  );
  const event = useAppSelector(eventSelector);
  // console.log(event);

  const [organizer, setOrganizer] = useState<User | null>(null);
  const getOrganizer = async () => {
    if (event) {
      const res = await userService.getOne(event.organizer);
      setOrganizer(res);
    }
  };

  useEffect(() => {
    getOrganizer();
  }, [event]);

  if (event && organizer) {
    return <EventDetail event={event} organizer={organizer} />;
  } else {
    return <p>Loading event...</p>;
  }
};

export default EventDetailWrapper;
