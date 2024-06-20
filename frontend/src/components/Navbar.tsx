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
import { EventFilter } from "../utils/types";

const Navbar = ({
  searchFilters,
  setSearchFilters,
  handleSubmitSearch,
}: {
  searchFilters: EventFilter;
  setSearchFilters: React.Dispatch<React.SetStateAction<EventFilter>>;
  handleSubmitSearch: () => void;
}) => {
  return (
    <>
      <Box bg="teal.500" px={8}>
        <Flex h={20} alignItems={"center"} justifyContent={"space-between"}>
          <HStack spacing={24} alignItems={"center"}>
            <Box>
              <Heading size="lg" color="white">
                Alchemy
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
                  onClick={handleSubmitSearch}
                >
                  <SearchIcon color="white" />
                </Button>
              </InputRightElement>
            </InputGroup>
          </HStack>
          <HStack as={"nav"} spacing={4} display={{ base: "none", md: "flex" }}>
            <Button colorScheme="orange" variant="solid">
              Create Event
            </Button>
            <Button colorScheme="teal" variant="solid">
              Login
            </Button>
            <Button colorScheme="teal" variant="solid">
              Sign Up
            </Button>
          </HStack>
        </Flex>
      </Box>
    </>
  );
};

export default Navbar;
