import { useState } from "react";
import { Heading, Text } from "@chakra-ui/react";
import { Event, UserState } from "../utils/types";
import { useAppSelector, useAppDispatch } from "../utils/hooks";

const User = () => {
  const user: UserState = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();

  if (!user.id) {
    return null;
  } else {
    return (
      <>
        <Heading size="md">
          {user.firstName} {user.lastName}
        </Heading>
        <Text>Location: {user.location}</Text>
      </>
    );
  }
};

export default User;
