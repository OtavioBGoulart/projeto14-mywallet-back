import joi from "joi";

const outputSchema = joi.object({
  type: joi.string().valid("output").required(),
  value: joi.number().required(),
});

export default outputSchema;