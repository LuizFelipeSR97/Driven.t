import { AuthenticatedRequest } from "@/middlewares";
import { Response } from "express";
import httpStatus from "http-status";
import activitiesService from "@/services/activities-service";

export async function listActivitiesLocations(req: AuthenticatedRequest, res: Response) {
  try {
    const locations = await activitiesService.getActivitiesLocations();
    return res.status(httpStatus.OK).send(locations);
  } catch (error) {
    return res.sendStatus(httpStatus.NOT_FOUND);
  }
}

export async function listActivities(req: AuthenticatedRequest, res: Response) {
  try {
    const activities = await activitiesService.getActivities();
    return res.status(httpStatus.OK).send(activities);
  } catch (error) {
    return res.sendStatus(httpStatus.NOT_FOUND);
  }
}

export async function listUserSubscriptions(req: AuthenticatedRequest, res: Response) {
  const { userId } = req;
  const id = Number(req?.query.id);

  try {
    if (!id) {
      const subscriptions = await activitiesService.getUserSubscriptions(userId);
      return res.status(httpStatus.OK).send(subscriptions);
    } else {
      const subscription = await activitiesService.getUserSubscriptionById(userId, id);
      return res.status(httpStatus.OK).send(subscription);
    }
  } catch (error) {
    return res.sendStatus(httpStatus.NOT_FOUND);
  }
}

export async function activitySubscriptionCreateOrUpdate(req: AuthenticatedRequest, res: Response) {
  const { userId } = req;
  const { activityId } = req.body;

  try {
    const subscription = await activitiesService.createOrUpdateActivitySubscription(userId, activityId);

    if(!activityId) {
      return res.status(httpStatus.CREATED).send(subscription);
    }

    return res.status(httpStatus.OK).send(subscription);
  } catch (error) {
    if(error.statusText === "CONFLICT") {
      return res.sendStatus(httpStatus.CONFLICT);
    }
    return res.sendStatus(httpStatus.NOT_FOUND);
  }
}

export async function createActivity(req: AuthenticatedRequest, res: Response) {
  // eslint-disable-next-line prefer-const
  let { name, capacity, activityLocationId, startTime, endTime } = req.body;
  if (typeof(capacity)==="string") {
    capacity=Number(capacity);
  }

  try {
    const activity = await activitiesService.createActivity(name, capacity, activityLocationId, startTime, endTime);

    return res.status(httpStatus.CREATED).send(activity);
  } catch (error) {
    return res.status(httpStatus.BAD_REQUEST).send(error.message);
  }
}

export async function deleteActivity(req: AuthenticatedRequest, res: Response) {
  let { id } = req.body;
  id = Number(id);

  try {
    await activitiesService.deleteActivity(id);

    return res.status(httpStatus.OK).send("Activity deleted successfully");
  } catch (error) {
    if (error.name==="NotFoundError") {
      return res.sendStatus(httpStatus.NOT_FOUND);
    }
    return res.sendStatus(httpStatus.BAD_REQUEST);
  }
}
