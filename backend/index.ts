import express from "express";
const mongoose = require("mongoose");
const cors = require("cors");
import userRouter from "./routes/users";
import eventRouter from "./routes/events";
import loginRouter from "./routes/login";
import { tokenExtractor, unknownEndpoint } from "./utils/middleware";
import "./cron-jobs/updateEventStatus";

const app = express();
app.use(express.json());
app.use(cors());
app.use(tokenExtractor);

const PORT = process.env.PORT;

// mongoose
//   .connect("mongodb://localhost:27017/alchemy")
//   .then(() => {
//     console.log("connected to MongoDB");
//   })
//   .catch((error: unknown) => {
//     if (error instanceof Error) {
//       console.log("error connecting to MongoDB: ", error.message);
//     }
//   });

app.use("/api/users", userRouter);
app.use("/api/events", eventRouter);
app.use("/api/login", loginRouter);
app.use(unknownEndpoint);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
