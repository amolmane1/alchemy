// import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { Button, ButtonGroup } from "@chakra-ui/react";
import { Input } from "@chakra-ui/react";
import { Heading, Text } from "@chakra-ui/react";
import { FormControl, FormLabel, Box, Flex } from "@chakra-ui/react";
import { setUser } from "../reducers/userReducer";
import eventService from "../services/eventService";
import loginService from "../services/loginService";
import userService from "../services/userService";
import * as React from "react";
import { NewUser, UserState } from "../utils/types";
import { useAppDispatch } from "../utils/hooks";
import { useNavigate, Link } from "react-router-dom";
// import { showAlert } from "../reducers/notificationReducer";

const Signup = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const emptySignupDetails: NewUser = {
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    location: "",
  };
  const [signupDetails, setSignupDetails] = useState(emptySignupDetails);

  const handleSignup = async (event: React.SyntheticEvent) => {
    event.preventDefault();

    try {
      const signupResult = await userService.addOne(signupDetails);
      console.log(signupResult);
      const result: UserState = await loginService.loginUser({
        email: signupDetails.email,
        password: signupDetails.password,
      });
      if (!result.token) {
        throw new Error("Invalid token");
      }
      console.log(result);
      dispatch(setUser(result));
      window.localStorage.setItem("user", JSON.stringify(result));
      eventService.setToken(result.token);
      setSignupDetails(emptySignupDetails);
      navigate("/");
    } catch (error) {
      console.log(error);
      // dispatch(showAlert("wrong username or password"));
    }
  };

  return (
    <Flex
      justifyContent="center"
      alignItems="flex-start"
      minHeight="100vh"
      pt="100px"
    >
      <Box
        width="400px"
        padding="8"
        boxShadow="lg"
        borderRadius="md"
        backgroundColor="white"
      >
        <>
          <Heading size="md">Signup</Heading>
          <Text>
            Already have an account? <Link to="/login">Login!</Link>
          </Text>
          <form onSubmit={handleSignup}>
            <FormControl>
              <FormLabel>First Name</FormLabel>
              <Input
                name="firstNameField"
                value={signupDetails.firstName}
                onChange={(event) =>
                  setSignupDetails({
                    ...signupDetails,
                    firstName: event.target.value,
                  })
                }
              ></Input>
            </FormControl>
            <FormControl>
              <FormLabel>Last Name</FormLabel>
              <Input
                name="lastNameField"
                value={signupDetails.lastName}
                onChange={(event) =>
                  setSignupDetails({
                    ...signupDetails,
                    lastName: event.target.value,
                  })
                }
              ></Input>
            </FormControl>
            <FormControl>
              <FormLabel>City</FormLabel>
              <Input
                name="locationField"
                value={signupDetails.location}
                onChange={(event) =>
                  setSignupDetails({
                    ...signupDetails,
                    location: event.target.value,
                  })
                }
              ></Input>
            </FormControl>
            <FormControl>
              <FormLabel>Email</FormLabel>
              <Input
                name="emailField"
                value={signupDetails.email}
                onChange={(event) =>
                  setSignupDetails({
                    ...signupDetails,
                    email: event.target.value,
                  })
                }
              ></Input>
            </FormControl>
            <FormControl>
              <FormLabel>Password</FormLabel>
              <Input
                name="passwordField"
                value={signupDetails.password}
                onChange={(event) =>
                  setSignupDetails({
                    ...signupDetails,
                    password: event.target.value,
                  })
                }
              ></Input>
            </FormControl>
            <Button type="submit" colorScheme="teal" width="full">
              Signup
            </Button>
          </form>
        </>
      </Box>
    </Flex>
  );
};

export default Signup;
