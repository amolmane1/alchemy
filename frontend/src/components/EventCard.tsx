import { Box, Card, CardBody, Stack, Heading, Text } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { formatDate } from "../utils/helper_functions";
import { Event } from "../utils/types";

const EventCard = ({ event }: { event: Event }) => {
  const startDatetime = formatDate(event.startDatetime.toString());
  const endDatetime = formatDate(event.endDatetime.toString());
  // console.log(event);
  return (
    <>
      <Link to={`event/${event.id}`}>
        <Card
          width="600px"
          margin="2"
          boxShadow="lg"
          borderRadius="md"
          backgroundColor="white"
          direction="column"
          overflow="hidden"
          variant="outline"
        >
          <Stack>
            <CardBody>
              <Heading size="md">{event.title}</Heading>
              <Text py="2">{event.type}</Text>
              <Text>
                {startDatetime.date}, {startDatetime.time} to{" "}
                {startDatetime.date === endDatetime.date
                  ? ""
                  : `${endDatetime.date} `}
                {endDatetime.time}
              </Text>
              <Text py="2">{`${event.acceptedUsers.length} attending`}</Text>
            </CardBody>
          </Stack>
        </Card>
      </Link>
    </>
  );
};

export default EventCard;
