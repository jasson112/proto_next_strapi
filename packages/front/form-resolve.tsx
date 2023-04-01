import { joiResolver } from "@hookform/resolvers/joi";
import Joi from "joi";

export interface FormValues {
  name: string;
  full_name: string;
  phone: string;
  company_name: string;
  email: string;
  message: string;
  tc: boolean;
  category: string;
};

const errorMessages = {
  require: "this field is required",
  number: "this field must be a number",
  email: "this field must be an email",
  tc: "Accept Privacy Policy",
};

const schema = Joi.object({
  name: Joi.string().trim().required().messages({
    "string.empty": errorMessages.require,
  }),
  phone: Joi.string().regex(/^\d+$/).allow("").messages({
    "string.pattern.base": errorMessages.number,
  }),
  email: Joi.string()
    .email({ tlds: { allow: false } })
    .required()
    .messages({
      "string.email": errorMessages.email,
      "string.empty": errorMessages.require,
    }),
  company_name: Joi.string().allow(""),
  message: Joi.string().required().messages({
    "string.empty": errorMessages.require,
  }),
  tc: Joi.boolean().invalid(false).messages({
    "any.invalid": errorMessages.tc,
  }),
});

const schema_service = Joi.object({
  full_name: Joi.string().trim().required().messages({
    "string.empty": errorMessages.require,
  }),
  phone: Joi.string().regex(/^\d+$/).allow("").messages({
    "string.pattern.base": errorMessages.number,
  }),
  email: Joi.string()
    .email({ tlds: { allow: false } })
    .required()
    .messages({
      "string.email": errorMessages.email,
      "string.empty": errorMessages.require,
    }),
  company_name: Joi.string().allow(""),
  message: Joi.string().required().messages({
    "string.empty": errorMessages.require,
  }),
  tc: Joi.boolean().invalid(false).messages({
    "any.invalid": errorMessages.tc,
  }),
  category: Joi.string().required().messages({
    "string.empty": errorMessages.require,
  }),
});

export const formResolver = joiResolver(schema);
export const formResolverService = joiResolver(schema_service);
