import outputSchema from "../schemas/outputSchema.js";
import dayjs from "dayjs";


export function outputValidation(req, res, next) {
    const userId = req.user._id;
    const { type, value, description } = req.body;

    const transactionsData = {
        type,
        value,
        description
    }

    const { error } = outputSchema.validate(transactionsData, { abortEarly: false });

    if (error) {
        const errors = error.details.map((detail) => detail.message);
        return res.status(422).send(errors);
    }

    const day = dayjs().format("DD/MM");
    const userTransactions = {
        userId,
        type,
        value,
        description,
        day
    }

    req.userTransactions = userTransactions;

    next();

}