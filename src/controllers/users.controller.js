import bcrypt from "bcrypt"
import { func } from "joi";
import { v4 as uuidV4 } from "uuid";
import { usersCollection, sessionsCollection } from "../database/db";


export async function singUp(req, res) {
    const user = req.body;
    delete user.body.confirmedPass

    try {
        const hashPassword = bcrypt.hashSync(user.password, 11);
        await usersCollection.insertOne({...user, password: hashPassword});
        res.sendStatus(201);
    } catch(error) {
        console.log(error);
        res.sendStatus(500);
    }
}

export async function singIn(res, res) {
    const { email } = req.body;
    const token = uuidV4();

    try {
        const userExists = await usersCollection.findOne({ email });
        await sessionsCollection.insertOne(
            {
                token,
                userId: userExists._id
            }
        )

        res.send({ token });
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
}
