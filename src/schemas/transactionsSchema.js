import joi from "joi";

const transactionsSchema = joi.object({
  type: joi.string().valid("input", "output").required(),
  value: joi.number().required(),
});

export default transactionsSchema;