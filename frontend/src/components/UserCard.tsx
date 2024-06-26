import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Text,
  Button,
} from "@chakra-ui/react";
import { Event, User, UserState } from "../utils/types";
import { useAppSelector, useAppDispatch } from "../utils/hooks";
import {
  handleAcceptRequestToJoinEvent,
  handleRejectRequestToJoinEvent,
} from "../reducers/eventsReducer";
import { useEffect, useState } from "react";
import userService from "../services/userService";

// show user name + button to accept/reject request
const UserCard = ({
  displayedUserId,
  event,
  type,
}: {
  displayedUserId: string;
  event: Event;
  type: string;
}) => {
  const dispatch = useAppDispatch();
  const user: UserState = useAppSelector((state) => state.user);

  const acceptRequest = async () => {
    // console.log("accept");
    await dispatch(handleAcceptRequestToJoinEvent(event.id, displayedUserId));
  };

  const rejectRequest = async () => {
    // console.log("reject");
    await dispatch(handleRejectRequestToJoinEvent(event.id, displayedUserId));
  };

  const [displayedUser, setDisplayedUser] = useState<User | null>(null);
  const getDisplayedUser = async () => {
    const res = await userService.getOne(displayedUserId);
    setDisplayedUser(res);
  };

  useEffect(() => {
    getDisplayedUser();
  }, []);

  if (!displayedUser) {
    return <></>;
  } else {
    return (
      <>
        <Card p={0} m={1} w={300}>
          <CardBody>
            <Text>
              {displayedUser.firstName} {displayedUser.lastName}
            </Text>
            {event.organizer === user.id && type === "requested" && (
              <>
                <Button
                  variant="solid"
                  colorScheme="green"
                  onClick={acceptRequest}
                >
                  Accept
                </Button>
                <Button
                  variant="solid"
                  colorScheme="red"
                  onClick={rejectRequest}
                >
                  Reject
                </Button>
              </>
            )}
          </CardBody>
        </Card>
      </>
    );
  }
};

export default UserCard;
