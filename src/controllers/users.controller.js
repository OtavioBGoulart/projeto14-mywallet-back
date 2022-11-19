import bcrypt from "bcrypt"
import { v4 as uuidV4 } from "uuid";
import { usersCollection, sessionsCollection } from "../database/db";

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
