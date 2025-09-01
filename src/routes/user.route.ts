import { Router } from "express";
import { LoginUserController, RegisterUserController } from "../controller/user.controller";

const router = Router();

router.post('/signup',RegisterUserController)
router.get('/login',LoginUserController)



export default router;