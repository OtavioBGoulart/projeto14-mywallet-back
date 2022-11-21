import bcrypt from "bcrypt"
import { v4 as uuidV4 } from "uuid";
import { usersCollection, sessionsCollection, balanceCollection } from "../database/db.js";


export async function singUp(req, res) {
    const user = req.singupData;

    try {
        const hashPassword = bcrypt.hashSync(user.password, 11);
        await usersCollection.insertOne({...user, password: hashPassword});
        const userId = await usersCollection.findOne({ email: user.email });
        await balanceCollection.insertOne({userId: userId._id, balance: 0});
        res.sendStatus(201);
    } catch(error) {
        console.log(error);
        res.sendStatus(500);
    }
}

export async function singIn(req, res) {
    const { email } = req.body;
    console.log(req.singinData);
    const token = uuidV4();

    try {
        const userExists = await usersCollection.findOne({ email });
        const userName = userExists.name;
        await sessionsCollection.insertOne(
            {
                token,
                userId: userExists._id
            }
        )

        res.send({ token, userName });
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
}
