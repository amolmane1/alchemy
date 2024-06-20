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
import { Event } from "../utils/types";

const EventCard = ({ event }: { event: Event }) => {
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
            <Text py="2">
              {`${event.startDatetime} to ${event.endDatetime}`}
            </Text>
            <Text py="2">{`${event.requestedUsers.length} requested`}</Text>
            <Text py="2">{`${event.acceptedUsers.length} attending`}</Text>
          </CardBody>

          <CardFooter>
            <Button variant="solid" colorScheme="blue">
              Request to join
            </Button>
          </CardFooter>
        </Stack>
      </Card>
    </>
  );
};

export default EventCard;
