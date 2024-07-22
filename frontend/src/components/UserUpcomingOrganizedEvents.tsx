import { Heading } from "@chakra-ui/react";
import { createSelector } from "@reduxjs/toolkit";
import {
  useAppSelector,
  // useAppDispatch
} from "../utils/hooks";
import { Event, UserState } from "../utils/types";
import EventCard from "./EventCard";

const UserUpcomingOrganizedEvents = () => {
  const user: UserState = useAppSelector((state) => state.user);
  const filteredEventsSelector = createSelector(
    [(state) => state.events],
    (events) => {
      const filteredEvents: Event[] = events.filter((e: Event) => {
        console.log(e);
        const statusCheck = e.status === "upcoming" || e.status === "ongoing";
        const isOrganizedCheck = e.organizer === user.id;
        return statusCheck && isOrganizedCheck;
      });
      const sortedEvents = filteredEvents.sort((a, b) =>
        a.startDatetime > b.startDatetime ? 1 : -1
      );
      return sortedEvents;
    }
  );
  const eventsList = useAppSelector(filteredEventsSelector);

  if (!user.id) {
    return null;
  } else {
    return (
      <>
        {/* <Heading size="sm">Upcoming events you've organized</Heading> */}
        {eventsList.map((e: Event) => (
          <EventCard key={e.id} event={e} />
        ))}
      </>
    );
  }
};

export default UserUpcomingOrganizedEvents;
