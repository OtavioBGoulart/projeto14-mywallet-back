import singinSchema from "../schemas/sing-inSchema";
import bcrypt from "bcrypt";
import { usersCollection } from "../database/db";

export async function singinValidation (req, res, next) {
    const {email, password} = req.body;

    try {
         const userExists = await usersCollection.findOne({ email });
         if (!userExists) {
            return res.sendStatus(401);
         } 

         const passwordOk = bcrypt.compareSync(password, userExists.password);
         if (!password) {
            return res.sendStatus(401);
         }
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }

    req.userSingin = userExists;

    next();
}

// export async function singinValidation (req, res, next) {
//     const {email, password} = req.body;

//     const singinData = {
//         email,
//         password
//     }

//     const { error } = singinSchema.validate(singinData, { abortEarly: false});

//     if (error) {
//         const errors = error.details.map((detail) => detail.message);
//         return res.status(422).send(errors);
//     }

//     req.singinData = singinData
// }