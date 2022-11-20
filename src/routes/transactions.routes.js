import { Router } from "express";
import { inputTransaction } from "../controllers/transactions.controller.js";
import { outputTransaction } from "../controllers/transactions.controller.js";
import { authValidation } from "../middlewares/auth.middleware.js";
import { inputValidation } from "../middlewares/input.middleware.js";
import { outputValidation } from "../middlewares/output.middleware.js";

const router = Router();

router.use(authValidation);

router.post("/input", inputValidation, inputTransaction);
router.post("/output", outputValidation, outputTransaction);

export default router;