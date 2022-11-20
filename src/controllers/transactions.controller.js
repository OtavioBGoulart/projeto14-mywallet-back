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