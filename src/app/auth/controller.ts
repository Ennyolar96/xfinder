import { plainToInstance } from "class-transformer";
import { validate } from "class-validator";
import { Request, Response } from "express";
import asyncHandler from "express-async-handler";
import { LoginUser, RegisterUser } from "./entity";
import { AuthServices } from "./service";

const authServices = new AuthServices();
export const CreateNewUser = asyncHandler(
  async (req: Request, res: Response) => {
    try {
      const data = plainToInstance(RegisterUser, req.body);
      const errors = await validate(data);
      if (errors.length > 0) {
        const formattedErrors = errors.map((error) => ({
          property: error.property,
          message: error.constraints,
        }));
        res.status(422).json(formattedErrors);
        return;
      }
      const user = await authServices.createNewUser(data);
      res.status(201).json(user);
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  }
);

export const SignInUser = asyncHandler(async (req: Request, res: Response) => {
  try {
    const data = plainToInstance(LoginUser, req.body);
    const errors = await validate(data);
    if (errors.length > 0) {
      const formattedErrors = errors.map((error) => ({
        property: error.property,
        message: error.constraints,
      }));
      res.status(422).json(formattedErrors);
      return;
    }
    const user = await authServices.authenticateUser(data);
    res.status(200).json(user);
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
});
