import { CardPaymentParams } from "@/services/payments-service";
import Joi from "joi";

export const effectPaymentSchema = Joi.object({
  ticketId: Joi.number().required(),
  cardData: Joi.object<CardPaymentParams>({
    issuer: Joi.string().required(),
    number: Joi.string().length(16).required(),
    name: Joi.string().required(),
    expirationDate: Joi.string().required(),
    cvv: Joi.number().required(),
  }).required(), 
});
