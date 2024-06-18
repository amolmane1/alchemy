import { Schema, model } from "mongoose";
import { NewEvent } from "../utils/types";

const eventSchema = new Schema<NewEvent>({
  type: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  datetime: {
    type: String,
    required: true,
  },
  organizer: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  status: {
    type: String,
    required: true,
  },
  requestedUsers: [
    {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  ],
  acceptedUsers: [
    {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  ],
});

eventSchema.set("toJSON", {
  transform: (_document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

const EventModel = model<NewEvent>("Event", eventSchema);

// module.exports = UserModel;
export default EventModel;
