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
// import { formatDate } from "../utils/helper_functions";
import { useState } from "react";
import { Event, UserState } from "../utils/types";
import { useAppSelector, useAppDispatch } from "../utils/hooks";
import {
  getAllEvents,
  handleRequestToJoinEvent,
  handleWithdrawRequestToJoinEvent,
} from "../reducers/eventsReducer";
import eventService from "../services/eventService";

const EventCard = ({ event }: { event: Event }) => {
  // const stringOrganizer = event.organizer.toString()
  const user: UserState = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();

  const isInRequestedUsers =
    event.requestedUsers.filter((u) => u.id === user.id).length > 0;
  const isInAcceptedUsers =
    event.acceptedUsers.filter((u) => u.id === user.id).length > 0;

  const [isRequested, setIsRequested] = useState<boolean>(
    user.id ? isInRequestedUsers || isInAcceptedUsers : false
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
            <Text py="2">{`Organized by: ${event.organizer.firstName} ${event.organizer.lastName}`}</Text>
            <Text py="2">{event.address}</Text>
            {/* <Text py="2">
              {`${formatDate(event.startDatetime)} to ${formatDate(
                event.endDatetime
              )}`}
            </Text> */}
            <Text py="2">
              {`${event.startDatetime} to ${event.endDatetime}`}
            </Text>
            <Text py="2">{`${event.requestedUsers.length} requested`}</Text>
            <Text py="2">{`${event.acceptedUsers.length} attending`}</Text>
          </CardBody>

          <CardFooter>
            <Button variant="solid" colorScheme="blue" onClick={handleRequest}>
              {isRequested ? "Withdraw request to join" : "Request to join"}
            </Button>
          </CardFooter>
        </Stack>
      </Card>
    </>
  );
};

export default EventCard;
