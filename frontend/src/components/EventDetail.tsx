import {
  Flex,
  Box,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Stack,
  Heading,
  Text,
  Button,
} from "@chakra-ui/react";
import { Tabs, TabList, TabPanels, Tab, TabPanel } from "@chakra-ui/react";
import { useParams } from "react-router-dom";
import { formatDate } from "../utils/helper_functions";
import { useEffect, useState } from "react";
import { Event, User, UserState } from "../utils/types";
import { createSelector } from "@reduxjs/toolkit";
import { useAppSelector, useAppDispatch } from "../utils/hooks";
import {
  handleRequestToJoinEvent,
  handleWithdrawRequestToJoinEvent,
} from "../reducers/eventsReducer";
import UserCard from "./UserCard";

const EventDetail = ({ event }: { event: Event }) => {
  const user: UserState = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();

  // const startDatetime = formatDate(event.startDatetime.toString());
  // const endDatetime = formatDate(event.endDatetime.toString());

  const isInRequestedUsers =
    event.requestedUsers.filter((u: User) => u.id === user.id).length > 0;
  const isInAcceptedUsers =
    event.acceptedUsers.filter((u: User) => u.id === user.id).length > 0;

  const [isRequested, setIsRequested] = useState<boolean>(
    user.id ? isInRequestedUsers || isInAcceptedUsers : false
  );

  const handleRequest = async () => {
    if (isRequested) {
      // console.log("is requested, will withdraw");
      await dispatch(handleWithdrawRequestToJoinEvent(event.id));
      setIsRequested(false);
    } else {
      // console.log("is not requested, will request");
      await dispatch(handleRequestToJoinEvent(event.id));
      setIsRequested(true);
    }
  };

  return (
    <>
      <Flex
        justifyContent="center"
        alignItems="flex-start"
        minHeight="100vh"
        pt="20px"
      >
        <Box
          width="700px"
          padding="8"
          boxShadow="lg"
          borderRadius="md"
          backgroundColor="white"
        >
          <Heading size="md">{event.title}</Heading>
          <Text py="2">{event.type}</Text>
          <Text py="2">{event.description}</Text>
          <Text py="2">Status: {event.status}</Text>
          <Text py="2">
            Organized by: {event.organizer.firstName} {event.organizer.lastName}
          </Text>
          <Text py="2">City: {event.location}</Text>
          <Text py="2">Address: {event.address}</Text>
          {/* <Text py="2">
            {startDatetime.date}, {startDatetime.time} to{" "}
            {startDatetime.date === endDatetime.date
              ? ""
              : `${endDatetime.date} `}
            {endDatetime.time}
          </Text> */}
          <Tabs variant="soft-rounded" colorScheme="green">
            <TabList>
              <Tab>{`${event.requestedUsers.length} requested to join`}</Tab>
              <Tab>{`${event.acceptedUsers.length} attending`}</Tab>
            </TabList>
            <TabPanels>
              <TabPanel>
                {event.requestedUsers.map((u) => (
                  <UserCard
                    key={u.id}
                    displayedUser={u}
                    event={event}
                    type="requested"
                  />
                ))}
              </TabPanel>
              <TabPanel>
                {event.acceptedUsers.map((u) => (
                  <UserCard
                    key={u.id}
                    displayedUser={u}
                    event={event}
                    type="accepted"
                  />
                ))}
              </TabPanel>
            </TabPanels>
          </Tabs>
          <Button
            variant="solid"
            colorScheme={isRequested ? "red" : "green"}
            onClick={handleRequest}
          >
            {isRequested ? "Withdraw request to join" : "Request to join"}
          </Button>
        </Box>
      </Flex>
    </>
  );
};

export default EventDetail;
