import * as auth from "@/app/auth/controller";
import { Router } from "express";

const authRouter = Router();

authRouter.post("/auth/signup", auth.CreateNewUser);
authRouter.post("/auth/signin", auth.SignInUser);

export default authRouter;
