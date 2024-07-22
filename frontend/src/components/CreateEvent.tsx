import {
  Center,
  Box,
  Flex,
  HStack,
  Button,
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement,
  Heading,
  FormControl,
  FormLabel,
} from "@chakra-ui/react";
import { useState } from "react";
import { createEvent } from "../reducers/eventsReducer";
import { useAppDispatch } from "../utils/hooks";
import { useNavigate } from "react-router-dom";
import { NewEventForm } from "../utils/types";
// import { formatDate } from "../utils/helper_functions";

const CreateEvent = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const emptyNewEventForm: NewEventForm = {
    type: "",
    title: "",
    description: "",
    location: "",
    address: "",
    startDatetime: new Date(),
    endDatetime: new Date(),
  };
  const [newEventForm, setNewEventForm] = useState(emptyNewEventForm);

  const formatDate = (date: Date) => {
    // return date.toISOString().slice(0, 16);
    const pad = (num: number) => (num < 10 ? `0${num}` : num);

    const year = date.getFullYear();
    const month = pad(date.getMonth() + 1);
    const day = pad(date.getDate());
    const hours = pad(date.getHours());
    const minutes = pad(date.getMinutes());

    return `${year}-${month}-${day}T${hours}:${minutes}`;
  };

  const handleCreateEvent = (event: React.SyntheticEvent) => {
    event.preventDefault();
    console.log(newEventForm);
    dispatch(createEvent(newEventForm));
    navigate("/");
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
          width="600px"
          padding="8"
          boxShadow="lg"
          borderRadius="md"
          backgroundColor="white"
        >
          <Heading size="lg" textAlign="center">
            Create Event
          </Heading>
          <form onSubmit={handleCreateEvent}>
            <FormControl id="type" mb="4">
              <FormLabel>Event type</FormLabel>
              <Input
                type="text"
                value={newEventForm.type}
                onChange={(e) =>
                  setNewEventForm({ ...newEventForm, type: e.target.value })
                }
              />
            </FormControl>
            <FormControl id="title" mb="4">
              <FormLabel>Title</FormLabel>
              <Input
                type="text"
                value={newEventForm.title}
                onChange={(e) =>
                  setNewEventForm({ ...newEventForm, title: e.target.value })
                }
              />
            </FormControl>
            <FormControl id="description" mb="4">
              <FormLabel>Description</FormLabel>
              <Input
                type="text"
                value={newEventForm.description}
                onChange={(e) =>
                  setNewEventForm({
                    ...newEventForm,
                    description: e.target.value,
                  })
                }
              />
            </FormControl>
            <FormControl id="city" mb="4">
              <FormLabel>City</FormLabel>
              <Input
                type="text"
                value={newEventForm.location}
                onChange={(e) =>
                  setNewEventForm({ ...newEventForm, location: e.target.value })
                }
              />
            </FormControl>
            <FormControl id="address" mb="4">
              <FormLabel>Address</FormLabel>
              <Input
                type="text"
                value={newEventForm.address}
                onChange={(e) =>
                  setNewEventForm({ ...newEventForm, address: e.target.value })
                }
              />
            </FormControl>
            <FormControl id="start" mb="4">
              <FormLabel>Start date and time</FormLabel>
              <Input
                placeholder="Select Date and Time"
                size="md"
                type="datetime-local"
                value={formatDate(newEventForm.startDatetime)}
                onChange={(e) =>
                  setNewEventForm({
                    ...newEventForm,
                    startDatetime: new Date(e.target.value),
                  })
                }
              />
            </FormControl>
            <FormControl id="end" mb="4">
              <FormLabel>Start date and time</FormLabel>
              <Input
                placeholder="Select Date and Time"
                size="md"
                type="datetime-local"
                value={formatDate(newEventForm.endDatetime)}
                onChange={(e) =>
                  setNewEventForm({
                    ...newEventForm,
                    endDatetime: new Date(e.target.value),
                  })
                }
              />
            </FormControl>
            <Button type="submit" colorScheme="teal" width="full">
              Submit
            </Button>
          </form>
        </Box>
      </Flex>
    </>
  );
};

export default CreateEvent;
