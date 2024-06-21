import { Flex } from "@chakra-ui/react";
import { createSelector } from "@reduxjs/toolkit";
import {
  useAppSelector,
  // useAppDispatch
} from "../utils/hooks";
import EventCard from "./EventCard";
import { Event, EventFilter } from "../utils/types";

const EventsList = ({ eventFilters }: { eventFilters: EventFilter }) => {
  const filteredEventsSelector = createSelector(
    [(state) => state.events],
    (events) =>
      events.filter((e: Event) => {
        const statusCheck = e.status === "upcoming" || e.status === "ongoing";
        const locationCheck = e.location
          .toLowerCase()
          .includes(eventFilters.location.toLowerCase());
        const textCheck =
          e.title.toLowerCase().includes(eventFilters.text.toLowerCase()) ||
          e.description
            .toLowerCase()
            .includes(eventFilters.text.toLowerCase()) ||
          e.type.toLowerCase().includes(eventFilters.text.toLowerCase());
        return statusCheck && locationCheck && textCheck;
      })
  );
  const filteredEvents = useAppSelector(filteredEventsSelector);
  console.log(filteredEvents);
  return (
    <>
      <Flex
        direction="column"
        justifyContent="center"
        alignItems="center"
        minHeight="100vh"
        pt="20px"
      >
        {filteredEvents.map((e: Event) => (
          <EventCard key={e.id} event={e} />
        ))}
      </Flex>
    </>
  );
};

export default EventsList;
