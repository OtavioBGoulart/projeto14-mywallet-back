import { Router } from "express";
import { singIn, singUp } from "../controllers/users.controller.js";
import { singinValidation } from "../middlewares/sing-inValidate.middleware.js";
import { singupValidation } from "../middlewares/singupSchema.midleware.js";

const router = Router();

router.post("/sing-up", singupValidation, singUp);
router.post("/sing-in", singinValidation, singIn);

export default router;