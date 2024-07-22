import { Heading } from "@chakra-ui/react";
import { createSelector } from "@reduxjs/toolkit";
import {
  useAppSelector,
  // useAppDispatch
} from "../utils/hooks";
import { Event, UserState } from "../utils/types";
import EventCard from "./EventCard";

const UserUpcomingAcceptedEvents = () => {
  const user: UserState = useAppSelector((state) => state.user);
  const filteredEventsSelector = createSelector(
    [(state) => state.events],
    (events) => {
      const filteredEvents: Event[] = events.filter((e: Event) => {
        console.log(e);
        const statusCheck = e.status === "upcoming" || e.status === "ongoing";
        // const isAcceptedCheck = e.acceptedUsers.find((u) => u.id === user.id);
        const isAcceptedCheck =
          user.id &&
          e.users.hasOwnProperty(user.id) &&
          e.users[user.id] === "accepted";
        return statusCheck && isAcceptedCheck;
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
        {/* <Heading size="sm">
          Upcoming events you've been accepted to join
        </Heading> */}
        {eventsList.map((e: Event) => (
          <EventCard key={e.id} event={e} />
        ))}
      </>
    );
  }
};

export default UserUpcomingAcceptedEvents;
