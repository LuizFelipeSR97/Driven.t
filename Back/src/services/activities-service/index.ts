import { notFoundError, startTimeBefore9Error, endTimeBeforeStartTimeError, scheduleConflictError, activityDurationTimeError, activityBeforeOrAfterEvent, requestError } from "@/errors";
import activitiesRepository from "@/repositories/activities-repository";
import eventRepository from "@/repositories/event-repository";
import { Activity, ActivitySubscription } from "@prisma/client";
import dayjs from "dayjs";

async function getActivitiesLocations() {
  const locations = await activitiesRepository.findAllLocations();
  if (!locations) {
    throw notFoundError();
  }
  return locations;
}

async function getActivities() {
  const activities = await activitiesRepository.getActivities();
  if (!activities) {
    throw notFoundError();
  }
  return activities.sort(function(a, b) {
    return a.startTime < b.startTime ? -1 : a.startTime > b.startTime ? 1 : 0;
  });
}

async function getUserSubscriptions(userId: number) {
  const subscriptions = await activitiesRepository.getUserSubscriptions(userId);
  if (!subscriptions) {
    throw notFoundError();
  }
  return subscriptions;
}

async function getUserSubscriptionById(userId: number, activityId: number) {
  const subscription = await activitiesRepository.getUserSubscriptionById(userId, activityId);
  if (!subscription) {
    throw notFoundError();
  }
  return subscription;
}

async function createActivity(name: string, capacity: number, activityLocationId: number, startTime: Date, endTime: Date) {
  if(dayjs(endTime).diff(dayjs(startTime), "minutes")<0) {
    throw endTimeBeforeStartTimeError();
  }

  if(dayjs(startTime).hour()<9) {
    throw startTimeBefore9Error();
  }

  if(dayjs(endTime).diff(dayjs(startTime), "minutes")<60) {
    throw activityDurationTimeError();
  }

  const event = await eventRepository.findFirst();

  if(dayjs(startTime).diff(dayjs(event.startsAt), "minutes")<0) {
    throw activityBeforeOrAfterEvent();
  }

  if(dayjs(endTime).diff(dayjs(event.endsAt), "minutes")>0) {
    throw activityBeforeOrAfterEvent();
  }

  const tzStartTime = dayjs(startTime).add(-3, "h").toDate();
  const tzEndTime = dayjs(endTime).add(-3, "h").toDate();

  const activityAtSameTime = await activitiesRepository.getActivityByTimeAndLocation(tzStartTime, tzEndTime, activityLocationId);

  if(activityAtSameTime) {
    throw scheduleConflictError();
  }

  const activityCreated = await activitiesRepository.createNewActivity(name, capacity, activityLocationId, tzStartTime, tzEndTime);

  return activityCreated;
}

async function createOrUpdateActivitySubscription(userId: number, activityId: number) {
  const activitySubscription: ActivitySubscription = await activitiesRepository.getUserSubscriptionById(userId, activityId);

  const activity = await activitiesRepository.getActivityById(activityId);
  if(!activity) {
    throw notFoundError();
  }

  const userSubsActivities = await activitiesRepository.getUserSubscriptionsWithActivities(userId);

  const findSubscription = userSubsActivities.find( element => {
    const month = element.Activity.startTime.getMonth();
    const selectedMonth = activity.startTime.getMonth();
    if(month === selectedMonth) {
      const day = element.Activity.startTime.getDay();
      const selectedDay = activity.startTime.getDay();
      if(day === selectedDay) {
        const hour = element.Activity.startTime.getHours();
        const selectedHour = activity.startTime.getHours();
        const selectedEndHour = activity.endTime.getHours();
        if((hour >= selectedHour && hour < selectedEndHour) && element.Activity.name !== activity.name) {
          return element;
        }
      }
    }
  });
  
  if(findSubscription) {
    throw requestError(409, "CONFLICT");
  }

  if(!activitySubscription) {
    await activitiesRepository.createSubUpdateActivity(userId, activityId);
  } else {
    await activitiesRepository.updateSubUpdateActivity(activitySubscription.id, activityId, !activitySubscription.isSubscribed);
  }
}

async function deleteActivity(id: number) {
  try { 
    const deletedActivity = await activitiesRepository.deleteActivity(id);
  } catch {
    throw notFoundError();
  }
  return;
}

const activitiesService = {
  getActivitiesLocations,
  getActivities,
  getUserSubscriptions,
  getUserSubscriptionById,
  createOrUpdateActivitySubscription,
  createActivity,
  deleteActivity
};

export default activitiesService;
