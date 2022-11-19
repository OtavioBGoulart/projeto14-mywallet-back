import { transCollection, balanceCollection } from "../database/db.js";
import transactionsSchema from "../schemas/transactionsSchema.js";


export async function transactionsValidation (req, res, next) {
    const user = req.user;
    const {type, value} = req.body;

    const transactionsData = {
        type,
        value
    }

    const { error } = transactionsSchema.validate(transactionsData, { abortEarly: false });

        if (error) {
            const errors = error.details.map((detail) => detail.message);
            return res.status(422).send(errors);
        }
    
    req.user = user;

    next();
    
}