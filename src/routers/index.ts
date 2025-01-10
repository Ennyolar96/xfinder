import { Application } from "express";
import authRouter from "./auth";
import userRouter from "./user";

export const applicationRoutes = (app: Application) => {
  [authRouter, userRouter].forEach((route) => {
    app.use("/api", route);
  });
};
