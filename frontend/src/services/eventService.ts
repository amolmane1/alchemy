import axios from "axios";
import { NewEventForm } from "../utils/types";
const baseUrl = "http://localhost:3000/api/events";

let token: string | null = null;

const setToken = (value: string | null) => {
  if (value) {
    token = `Bearer ${value}`;
  } else {
    token = null;
  }
};

const getAll = async () => {
  const response = await axios.get(baseUrl);
  return response.data;
};

const addOne = async (payload: NewEventForm) => {
  console.log("addOne", payload);
  const config = {
    headers: { Authorization: token },
  };
  const response = await axios.post(baseUrl, payload, config);
  return response.data;
};

const requestToJoinEvent = async (eventId: string) => {
  console.log("request");
  const config = {
    headers: { Authorization: token },
  };
  const response = await axios.patch(
    `${baseUrl}/${eventId}/request-to-join`,
    {},
    config
  );
  return response.data;
};

const withdrawRequestToJoinEvent = async (eventId: string) => {
  console.log("withdraw");
  const config = {
    headers: { Authorization: token },
  };
  const response = await axios.patch(
    `${baseUrl}/${eventId}/withdraw-request-to-join`,
    {},
    config
  );
  return response.data;
};

export default {
  setToken,
  getAll,
  addOne,
  requestToJoinEvent,
  withdrawRequestToJoinEvent,
};
