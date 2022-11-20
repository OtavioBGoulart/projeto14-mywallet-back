import { Router } from "express";
import { inputTransaction } from "../controllers/transactions.controller.js";
import { authValidation } from "../middlewares/auth.middleware.js";
import { transactionsValidation } from "../middlewares/transactions.middleware.js";

const router = Router();

router.use(authValidation);

router.post("/input", transactionsValidation, inputTransaction);

export default router;