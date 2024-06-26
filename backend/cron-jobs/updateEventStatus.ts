// import cron from "node-cron";
// import eventService from "../services/eventService";
// import { EventStatusUpdateFilter, EventFilterQuery } from "../utils/types";

// const updateOngoingEventsStatus = async () => {
//   const ongoingEventFilter: EventFilterQuery = {
//     startDatetime: { $lt: new Date() },
//     status: { $ne: "ongoing" },
//   };
//   const eventsToUpdate = await eventService.getEvents(ongoingEventFilter);
//   eventsToUpdate.forEach(async (event) => {
//     const status = "ongoing";
//     await eventService.updateEvent(event.id, { status });
//     console.log(`--Updated status of event: ${event.id} to 'ongoing'`);
//   });
// };

// const updateFinishedEventsStatus = async () => {
//   const pastEventFilter: EventFilterQuery = {
//     endDatetime: { $lt: new Date() },
//     status: { $ne: "finished" },
//   };
//   const eventsToUpdate = await eventService.getEvents(pastEventFilter);
//   eventsToUpdate.forEach(async (event) => {
//     const status = "finished";
//     await eventService.updateEvent(event.id, { status });
//     console.log(`--Updated status of event: ${event.id} to 'finished'`);
//   });
// };

// // cron.schedule("*/5 * * * *", async () => {
// cron.schedule("0 0 * * *", async () => {
//   console.log(
//     "Running scheduled tasks updateOngoingEventsStatus and updateFinishedEventsStatus at: ",
//     new Date().toLocaleString()
//   );
//   await updateOngoingEventsStatus();
//   await updateFinishedEventsStatus();
// });
