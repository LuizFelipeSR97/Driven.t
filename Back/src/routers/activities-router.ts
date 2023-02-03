import { Router } from "express";
import { authenticateToken, validateBody } from "@/middlewares";
import { listActivitiesLocations, listActivities, listUserSubscriptions, createActivity, deleteActivity, activitySubscriptionCreateOrUpdate } from "@/controllers";
import { activitySchema, deleteActivitySchema } from "@/schemas/activities-schemas";

const activitiesRouter = Router();

activitiesRouter
  .all("/*", authenticateToken)
  .get("/locations", listActivitiesLocations)
  .get("", listActivities)
  .get("/subscriptions", listUserSubscriptions)
  .post("/subscriptions", activitySubscriptionCreateOrUpdate)
  .post("", validateBody(activitySchema), createActivity)
  .delete("", validateBody(deleteActivitySchema), deleteActivity);
//.put("/:activityId", changeActivity);

export { activitiesRouter };
