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

const EventDetail = ({
  event,
  organizer,
}: {
  event: Event;
  organizer: User;
}) => {
  const user: UserState = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();

  // const startDatetime = formatDate(event.startDatetime.toString());
  // const endDatetime = formatDate(event.endDatetime.toString());

  const acceptedUsers = Object.entries(event.users)
    .filter(([_, value]) => value === "accepted")
    .map((v) => v[0]);
  const requestedUsers = Object.entries(event.users)
    .filter(([_, value]) => value === "requested")
    .map((v) => v[0]);
  const rejectedUsers = Object.entries(event.users)
    .filter(([_, value]) => value === "rejected")
    .map((v) => v[0]);
  console.log(requestedUsers);
  console.log(acceptedUsers);
  console.log(rejectedUsers);

  const [userHasRequested, setUserHasRequested] = useState<boolean>(
    user.id ? user.id in event.users : false
  );
  const [userIsRejected, _] = useState<boolean>(
    user.id ? rejectedUsers.includes(user.id) : false
  );

  const handleRequest = async () => {
    if (userHasRequested) {
      // console.log("is requested, will withdraw");
      await dispatch(handleWithdrawRequestToJoinEvent(event.id));
      setUserHasRequested(false);
    } else {
      // console.log("is not requested, will request");
      await dispatch(handleRequestToJoinEvent(event.id));
      setUserHasRequested(true);
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
            Organized by: {organizer.firstName} {organizer.lastName}
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
              <Tab>{`${requestedUsers.length} requested to join`}</Tab>
              <Tab>{`${acceptedUsers.length} attending`}</Tab>
            </TabList>
            <TabPanels>
              <TabPanel>
                {requestedUsers.map((displayedUserId) => (
                  <UserCard
                    key={displayedUserId}
                    displayedUserId={displayedUserId}
                    event={event}
                    type="requested"
                  />
                ))}
              </TabPanel>
              <TabPanel>
                {acceptedUsers.map((displayedUserId) => (
                  <UserCard
                    key={displayedUserId}
                    displayedUserId={displayedUserId}
                    event={event}
                    type="accepted"
                  />
                ))}
              </TabPanel>
            </TabPanels>
          </Tabs>
          {userIsRejected ? (
            <Text>Your request to join this event has been rejected</Text>
          ) : (
            <Button
              variant="solid"
              colorScheme={userHasRequested ? "red" : "green"}
              onClick={handleRequest}
            >
              {userHasRequested
                ? "Withdraw request to join"
                : "Request to join"}
            </Button>
          )}
        </Box>
      </Flex>
    </>
  );
};

export default EventDetail;
