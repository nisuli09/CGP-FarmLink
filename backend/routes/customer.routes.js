import { Router } from "express";
import { customer_signup } from "../functions/customer.functions.js"

const userRouter = Router();

userRouter.post('/register', customer_signup)

export default userRouter;