import { Router } from "express";
import { user_login } from "../functions/login/login.functions.js";

const loginRouter = Router();

loginRouter.post('/login', user_login);

export default loginRouter;