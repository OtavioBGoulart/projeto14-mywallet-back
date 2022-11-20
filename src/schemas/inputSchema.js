import joi from "joi";

const inputSchema = joi.object({
  type: joi.string().valid("input").required(),
  value: joi.number().required(),
});

export default inputSchema;