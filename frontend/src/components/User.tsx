import { useState } from "react";
import { Heading, Text, Flex, Box } from "@chakra-ui/react";
import {
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
} from "@chakra-ui/react";
import { Tabs, TabList, TabPanels, Tab, TabPanel } from "@chakra-ui/react";
import { Event, UserState } from "../utils/types";
import { useAppSelector, useAppDispatch } from "../utils/hooks";
import UserUpcomingRequestedEvents from "./UserUpcomingRequestedEvents";
import UserUpcomingAcceptedEvents from "./UserUpcomingAcceptedEvents";
import UserUpcomingOrganizedEvents from "./UserUpcomingOrganizedEvents";
import UserPastAttendedEvents from "./UserPastAttendedEvents";
import UserPastOrganizedEvents from "./UserPastOrganizedEvents";

const User = () => {
  const user: UserState = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();

  if (!user.id) {
    return null;
  } else {
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
            <Heading size="lg">
              {user.firstName} {user.lastName}
            </Heading>
            <Text py={2}>Location: {user.location}</Text>
            <Tabs variant="soft-rounded" colorScheme="green">
              <TabList>
                <Tab>Requested</Tab>
                <Tab>Attending</Tab>
                <Tab>Organizing</Tab>
                <Tab>Past</Tab>
                <Tab>Organized</Tab>
              </TabList>
              <TabPanels>
                <TabPanel>
                  <UserUpcomingRequestedEvents />
                </TabPanel>
                <TabPanel>
                  <UserUpcomingAcceptedEvents />
                </TabPanel>
                <TabPanel>
                  <UserUpcomingOrganizedEvents />
                </TabPanel>
                <TabPanel>
                  <UserPastAttendedEvents />
                </TabPanel>
                <TabPanel>
                  <UserPastOrganizedEvents />
                </TabPanel>
              </TabPanels>
            </Tabs>
          </Box>
        </Flex>
      </>
    );
  }
};

export default User;
