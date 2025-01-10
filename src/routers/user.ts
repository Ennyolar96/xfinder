import * as user from "@/app/user/controller";
import { AuthGuard } from "@/global/middleware";
import { Router } from "express";

const userRouter = Router();

userRouter
  .route("/user/:id")
  .patch(AuthGuard, user.UpdateSingleUser)
  .delete(AuthGuard, user.DeleteSingleUser);
userRouter.get("/users", user.FindManyUsers);
userRouter.get("/user", user.FindSingleUser);

export default userRouter;
