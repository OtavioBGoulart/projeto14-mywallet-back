import joi from "joi";

const inputSchema = joi.object({
  type: joi.string().valid("input").required(),
  value: joi.number().required(),
  description: joi.string().max(15).required()
});

export default inputSchema;