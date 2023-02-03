import Joi from "joi";

export const activitySchema = Joi.object({
  name: Joi.string().max(100).required(),
  capacity: Joi.number().min(1).max(999999999).required(),
  activityLocationId: Joi.number().required(),
  startTime: Joi.date().required(),
  endTime: Joi.date().required()
});

export const deleteActivitySchema = Joi.object({
  id: Joi.number().required()
});
