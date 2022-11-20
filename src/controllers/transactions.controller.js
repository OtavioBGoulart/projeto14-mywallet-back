import { balanceCollection, transCollection } from "../database/db.js";



export async function inputTransaction (req, res) {

    const userTransactions = req.userTransactions;

    try {
    await transCollection.insertOne( userTransactions );
    const { balance } = await balanceCollection.findOne({userId: userTransactions.userId});
    await balanceCollection.updateOne( {userId: userTransactions.userId}, 
        { $set:  {balance: (balance + Number(userTransactions.value))}});
    res.sendStatus(201);

    } catch (error) {
        console.log(error);
        return res.sendStatus(500);
    }

}

export async function outputTransaction (req, res) {

    const userTransactions = req.userTransactions;

    try {
    await transCollection.insertOne( userTransactions );
    const { balance } = await balanceCollection.findOne({userId: userTransactions.userId});
    await balanceCollection.updateOne( {userId: userTransactions.userId}, 
        { $set:  {balance: (balance - Number(userTransactions.value))}});
    res.sendStatus(201);

    } catch (error) {
        console.log(error);
        return res.sendStatus(500);
    }

}

export async function getHistory (req, res) {
    const  userId  = req.user._id;
    console.log(req.user)

    try {

        const transactions = await transCollection.find({ userId }).toArray();
        const { balance } = await balanceCollection.findOne( { userId });

        const history = {
            transactions,
            balance
        }

        res.send(history);

    } catch (error) {
        console.log(error);
        return res.sendStatus(500);
    }
}