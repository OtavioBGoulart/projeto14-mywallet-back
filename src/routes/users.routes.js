import { Router } from "express";
import { singIn, singUp } from "../controllers/users.controller";
import { singinValidation } from "../middlewares/sing-inValidate.middleware";
import { singupValidation } from "../middlewares/singupSchema.midleware";

const router = Router();

router.post("/sing-up", singupValidation, singUp);
router.post("/sing-in", singinValidation, singIn);

export default router;