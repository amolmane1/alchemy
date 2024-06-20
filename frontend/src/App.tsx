import { useState, useEffect } from "react";
import { useAppDispatch } from "./utils/hooks";
import EventsList from "./components/EventsList";
import Navbar from "./components/Navbar";
import { getAllEvents } from "./reducers/eventsReducer";
import { EventFilter } from "./utils/types";

const App = () => {
  const dispatch = useAppDispatch();

  const [searchFilters, setSearchFilters] = useState<EventFilter>({
    text: "",
    location: "",
  });

  const handleSubmitSearch = () => {
    console.log(searchFilters);
  };

  useEffect(() => {
    dispatch(getAllEvents());
  });
  return (
    <>
      <Navbar
        searchFilters={searchFilters}
        setSearchFilters={setSearchFilters}
        handleSubmitSearch={handleSubmitSearch}
      />
      <EventsList searchFilters={searchFilters} />
    </>
  );
};

export default App;
