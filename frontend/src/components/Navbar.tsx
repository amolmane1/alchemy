import {
  Box,
  Flex,
  HStack,
  Button,
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement,
  Heading,
} from "@chakra-ui/react";
import { SearchIcon } from "@chakra-ui/icons";
import { useState } from "react";
import { useAppDispatch, useAppSelector } from "../utils/hooks";
import { EventFilter, UserState } from "../utils/types";
import eventService from "../services/eventService";
import { removeUser } from "../reducers/userReducer";
import { Link, useNavigate } from "react-router-dom";

const Navbar = ({
  handleSubmitSearch,
}: {
  handleSubmitSearch: (searchFilters: EventFilter) => void;
}) => {
  const user: UserState = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const [searchFilters, setSearchFilters] = useState<EventFilter>({
    text: "",
    location: "",
  });

  const handleLogout = () => {
    window.localStorage.removeItem("user");
    eventService.setToken(null);
    dispatch(removeUser());
    navigate("/");
  };

  return (
    <>
      <Box bg="teal.500" px={8}>
        <Flex h={20} alignItems={"center"} justifyContent={"space-between"}>
          <HStack spacing={24} alignItems={"center"}>
            <Box>
              <Heading size="lg" color="white">
                <Link to="/">Alchemy</Link>
              </Heading>
            </Box>
            <InputGroup maxW="600px">
              <InputLeftElement
                pointerEvents="none"
                children={<SearchIcon color="gray.300" />}
              />
              <Input
                placeholder="Search events"
                bg="white"
                borderRightRadius="0"
                value={searchFilters.text}
                onChange={(event) =>
                  setSearchFilters({
                    ...searchFilters,
                    text: event.target.value,
                  })
                }
              />
              <Input
                placeholder="Vancouver"
                bg="white"
                borderLeftRadius="0"
                value={searchFilters.location}
                onChange={(event) =>
                  setSearchFilters({
                    ...searchFilters,
                    location: event.target.value,
                  })
                }
              />
              <InputRightElement width="4.5rem" height="100%">
                <Button
                  h="100%"
                  size="sm"
                  borderLeftRadius="0"
                  w="80px"
                  colorScheme="orange"
                  onClick={() => handleSubmitSearch(searchFilters)}
                >
                  <SearchIcon color="white" />
                </Button>
              </InputRightElement>
            </InputGroup>
          </HStack>
          <HStack as={"nav"} spacing={4} display={{ base: "none", md: "flex" }}>
            <Button colorScheme="orange" variant="solid">
              <Link to="/create-event">Create Event</Link>
            </Button>
            {user.token ? (
              <>
                <Button colorScheme="teal" variant="solid">
                  {user.firstName}
                </Button>
                <Button
                  colorScheme="teal"
                  variant="solid"
                  onClick={handleLogout}
                >
                  Logout
                </Button>
              </>
            ) : (
              <>
                <Button colorScheme="teal" variant="solid">
                  <Link to="/login">Login</Link>
                </Button>
                <Button colorScheme="teal" variant="solid">
                  <Link to="/signup">Sign up</Link>
                </Button>
              </>
            )}
          </HStack>
        </Flex>
      </Box>
    </>
  );
};

export default Navbar;
