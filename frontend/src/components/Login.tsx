// import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { Button, ButtonGroup } from "@chakra-ui/react";
import { Input } from "@chakra-ui/react";
import { Heading, Text } from "@chakra-ui/react";
import { FormControl, FormLabel, Flex, Box } from "@chakra-ui/react";
import { setUser, removeUser } from "../reducers/userReducer";
import eventService from "../services/eventService";
import loginService from "../services/loginService";
import * as React from "react";
import { UserState, LoginDetails } from "../utils/types";
import { useAppDispatch } from "../utils/hooks";
import { Link, useNavigate } from "react-router-dom";
// import { showAlert } from "../reducers/notificationReducer";

const Login = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const emptyLoginDetails: LoginDetails = {
    email: "",
    password: "",
  };
  const [loginDetails, setLoginDetails] = useState(emptyLoginDetails);

  const handleLogin = async (event: React.SyntheticEvent) => {
    event.preventDefault();

    try {
      // send post request to login endpoint
      const result: UserState = await loginService.loginUser(loginDetails);
      // if successful, set user and clear loginDetails
      // handle if result doesn't have expected data
      // if (result) {
      if (!result.token) {
        throw new Error("Invalid token");
      }
      console.log(result);
      dispatch(setUser(result));
      window.localStorage.setItem("user", JSON.stringify(result));
      // also set token for api calls that need auth
      eventService.setToken(result.token);
      setLoginDetails(emptyLoginDetails);
      navigate("/");
      // }
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
          <Heading size="md">Login</Heading>
          <Text>
            New here? <Link to="/signup">Sign up!</Link>
          </Text>
          <form onSubmit={handleLogin}>
            <FormControl>
              <FormLabel>Email</FormLabel>
              <Input
                name="usernameField"
                value={loginDetails.email}
                onChange={(event) =>
                  setLoginDetails({
                    ...loginDetails,
                    email: event.target.value,
                  })
                }
              ></Input>
            </FormControl>
            <FormControl>
              <FormLabel>Password</FormLabel>
              <Input
                name="passwordField"
                value={loginDetails.password}
                onChange={(event) =>
                  setLoginDetails({
                    ...loginDetails,
                    password: event.target.value,
                  })
                }
              ></Input>
            </FormControl>
            <Button type="submit" colorScheme="teal" width="full">
              Login
            </Button>
          </form>
        </>
      </Box>
    </Flex>
  );
};

export default Login;
