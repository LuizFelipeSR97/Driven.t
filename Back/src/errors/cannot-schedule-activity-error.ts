import { ApplicationError } from "@/protocols";

export function startTimeBefore9Error(): ApplicationError {
  return {
    name: "StartTimeBefore9Error",
    message: "Activity cannot start before 09:00",
  };
}

export function endTimeBeforeStartTimeError(): ApplicationError {
  return {
    name: "EndTimeBeforeStartTimeError",
    message: "Invalid time: activity cannot end before start",
  };
}

export function scheduleConflictError(): ApplicationError {
  return {
    name: "ScheduleConflictError",
    message: "There is an schedule conflict",
  };
}

export function activityDurationTimeError(): ApplicationError {
  return {
    name: "ActivityDurationTimeError",
    message: "Activity must last at least 1 hour",
  };
}

export function activityBeforeOrAfterEvent(): ApplicationError {
  return {
    name: "ActivityBeforeOrAfterEvent",
    message: "Activity cannot start before event start or end after event end",
  };
}
