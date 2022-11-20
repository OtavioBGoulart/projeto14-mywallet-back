import inputSchema from "../schemas/inputSchema.js";


export function inputValidation (req, res, next) {
    const userId = req.user._id;
    const {type, value} = req.body;

    const transactionsData = {
        type,
        value
    }

    const { error } = inputSchema.validate(transactionsData, { abortEarly: false });

        if (error) {
            const errors = error.details.map((detail) => detail.message);
            return res.status(422).send(errors);
        }
    
    const userTransactions = {
        userId,
        type,
        value
    }

    req.userTransactions = userTransactions;

    next();
    
}