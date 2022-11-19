import { balanceCollection, transCollection } from "../database/db.js";



export async function inputTransaction (req, res) {

    const userTransactions = req.userTransactions;

    try {
    const moneyInput = await transCollection.insertOne( userTransactions );
    const updateBalance = await balanceCollection.updateOne( {userId: userTransactions.userId}, 
        { $set:  {balance: (balance + userTransactions.value)}});
    res.sendStatus(201);

    } catch (error) {
        console.log(error);
        return res.sendStatus(500);
    }

}