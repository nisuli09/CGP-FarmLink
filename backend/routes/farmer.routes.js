import { Router } from "express";
import { farmer_signup } from "../functions/farmer.functions.js";

const farmerRouter = Router();

farmerRouter.post('/register', farmer_signup);

export default farmerRouter;