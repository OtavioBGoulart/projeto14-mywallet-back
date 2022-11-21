import joi from "joi";

const outputSchema = joi.object({
  type: joi.string().valid("output").required(),
  value: joi.number().required(),
  description: joi.string().required()
});

export default outputSchema;