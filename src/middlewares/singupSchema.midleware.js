import { usersCollection } from "../database/db.js";
import singupSchema from "../schemas/sing-upSchema.js";

export async function singupValidation(req, res, next) {
    const { name, email, password, confirmedPass } = req.body;

    if (password !== confirmedPass) {
        return res.status(409).send({ message: "As duas senhas devem ser iguais" })
    }

    try {
        const userExists = await usersCollection.findOne({ email });

        if (userExists) {
            return res.status(409).send({ message: "Esse email já existe" });
        }

        const singupData = {
            name,
            email,
            password,
            confirmedPass
        }

        const { error } = singupSchema.validate(singupData, { abortEarly: false });

        if (error) {
            const errors = error.details.map((detail) => detail.message);
            return res.status(422).send( {message: errors });
        }

        delete singupData.confirmedPass;
        req.singupData = singupData;

    } catch {
        return res.sendStatus(500);
    }

    

    next();
}