import { useState, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "./utils/hooks";
import EventsList from "./components/EventsList";
import Navbar from "./components/Navbar";
import CreateEvent from "./components/CreateEvent";
import { getAllEvents } from "./reducers/eventsReducer";
import { setUser } from "./reducers/userReducer";
import { Event, EventFilter } from "./utils/types";
import eventService from "./services/eventService";
import Login from "./components/Login";
import Signup from "./components/Signup";
import { useNavigate, Route, Routes, useMatch } from "react-router-dom";
import User from "./components/User";
import * as React from "react";
import EventDetail from "./components/EventDetail";

const App = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const user = useAppSelector((state) => state.user);
  console.log(user && user.token);

  const emptyFilter: EventFilter = {
    text: "",
    location: user.location ? user.location : "",
  };
  const [searchFilters, setSearchFilters] = useState<EventFilter>(emptyFilter);
  const [eventFilters, setEventFilters] = useState<EventFilter>(emptyFilter);

  const handleSubmitSearch = (event: React.SyntheticEvent) => {
    event.preventDefault();
    setEventFilters(searchFilters);
    navigate("/");
  };

  useEffect(() => {
    const unparsedLocalStorageUser = window.localStorage.getItem("user");
    if (unparsedLocalStorageUser) {
      const localStorageUser = JSON.parse(unparsedLocalStorageUser);
      if (localStorageUser && localStorageUser.token) {
        dispatch(setUser(localStorageUser));
        eventService.setToken(localStorageUser.token);
      }
    }
    dispatch(getAllEvents());
  }, []);

  return (
    <>
      <Navbar
        searchFilters={searchFilters}
        setSearchFilters={setSearchFilters}
        handleSubmitSearch={handleSubmitSearch}
      />
      <Routes>
        <Route path="/" element={<EventsList eventFilters={eventFilters} />} />
        <Route path="/user" element={<User />} />
        <Route path="/event/:id" element={<EventDetail />} />
        <Route path="/create-event" element={<CreateEvent />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </>
  );
};

export default App;
