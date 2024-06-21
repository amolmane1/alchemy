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
import * as React from "react";

const Navbar = ({
  searchFilters,
  setSearchFilters,
  handleSubmitSearch,
}: {
  searchFilters: EventFilter;
  setSearchFilters: React.Dispatch<React.SetStateAction<EventFilter>>;
  handleSubmitSearch: (event: React.SyntheticEvent) => void;
}) => {
  const user: UserState = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

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
              <Link to="/">
                <Heading size="lg" color="white">
                  Alchemy
                </Heading>
              </Link>
            </Box>
            <form onSubmit={handleSubmitSearch}>
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
                  placeholder="Search city"
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
                    type="submit"
                  >
                    <SearchIcon color="white" />
                  </Button>
                </InputRightElement>
              </InputGroup>
            </form>
          </HStack>
          <HStack as={"nav"} spacing={4} display={{ base: "none", md: "flex" }}>
            <Link to="/create-event">
              <Button colorScheme="orange" variant="solid">
                Create Event
              </Button>
            </Link>
            {user.token ? (
              <>
                <Link to="/user">
                  <Button colorScheme="teal" variant="solid">
                    {user.firstName}
                  </Button>
                </Link>
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
                <Link to="/login">
                  <Button colorScheme="teal" variant="solid">
                    Login
                  </Button>
                </Link>
                <Link to="/signup">
                  <Button colorScheme="teal" variant="solid">
                    Sign up
                  </Button>
                </Link>
              </>
            )}
          </HStack>
        </Flex>
      </Box>
    </>
  );
};

export default Navbar;
