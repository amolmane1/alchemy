import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Stack,
  Heading,
  Text,
  Button,
} from "@chakra-ui/react";
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

const EventDetail = () =>
  // { event }: { event: Event | null | undefined }
  {
    let { id } = useParams();
    const eventSelector = createSelector([(state) => state.events], (events) =>
      events.find((e: Event) => e.id === id)
    );
    const event = useAppSelector(eventSelector);
    console.log(event);

    const user: UserState = useAppSelector((state) => state.user);
    const dispatch = useAppDispatch();

    const startDatetime = event
      ? formatDate(event.startDatetime.toString())
      : null;
    const endDatetime = event ? formatDate(event.endDatetime.toString()) : null;

    console.log(startDatetime);
    console.log(endDatetime);

    const isInRequestedUsers = event
      ? event.requestedUsers.filter((u: User) => u.id === user.id).length > 0
      : null;
    const isInAcceptedUsers = event
      ? event.acceptedUsers.filter((u: User) => u.id === user.id).length > 0
      : null;

    const [isRequested, setIsRequested] = useState<boolean>(
      user.id && isInRequestedUsers
        ? isInRequestedUsers || isInAcceptedUsers
        : false
    );

    const handleRequest = async () => {
      if (isRequested) {
        console.log("is requested, will withdraw");
        await dispatch(handleWithdrawRequestToJoinEvent(event.id));
        setIsRequested(false);
      } else {
        console.log("is not requested, will request");
        await dispatch(handleRequestToJoinEvent(event.id));
        setIsRequested(true);
      }
      // await dispatch(getAllEvents());
    };

    return (
      <>
        {event && startDatetime && endDatetime && (
          <Card
            direction={{ base: "column", sm: "row" }}
            overflow="hidden"
            variant="outline"
          >
            <Stack>
              <CardBody>
                <Heading size="md">{event.title}</Heading>
                <Text py="2">{event.type}</Text>
                <Text py="2">{event.description}</Text>
                <Text py="2">
                  Organized by: {event.organizer.firstName}{" "}
                  {event.organizer.lastName}
                </Text>
                <Text py="2">City: {event.location}</Text>
                <Text py="2">Address: {event.address}</Text>
                {/* { } */}
                <Text>
                  {startDatetime.date}, {startDatetime.time} to{" "}
                  {startDatetime.date === endDatetime.date
                    ? ""
                    : `${endDatetime.date} `}
                  {endDatetime.time}
                </Text>
                <Text py="2">{`${event.requestedUsers.length} requested`}</Text>
                <Text py="2">{`${event.acceptedUsers.length} attending`}</Text>
              </CardBody>

              <CardFooter>
                <Button
                  variant="solid"
                  colorScheme="blue"
                  onClick={handleRequest}
                >
                  {isRequested ? "Withdraw request to join" : "Request to join"}
                </Button>
              </CardFooter>
            </Stack>
          </Card>
        )}
      </>
    );
  };

export default EventDetail;
