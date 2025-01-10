import asyncHandler from "express-async-handler";
import { Request, Response } from "express";
import { UserServices } from "./service";
import { plainToInstance } from "class-transformer";
import { FindManyUser, FindOneUser, Param, UpdateUser } from "./entity";
import { validate } from "class-validator";

const userServices = new UserServices();

export const UpdateSingleUser = asyncHandler(
  async (req: Request, res: Response) => {
    try {
      const param = plainToInstance(Param, req.params);
      const paramError = await validate(param);
      if (paramError.length > 0) {
        const formattedErrors = paramError.map((error) => ({
          property: error.property,
          message: error.constraints,
        }));
        res.status(422).json(formattedErrors);
        return;
      }

      const data = plainToInstance(UpdateUser, req.body);
      const errors = await validate(data);
      if (errors.length > 0) {
        const formattedErrors = errors.map((error) => ({
          property: error.property,
          message: error.constraints,
        }));
        res.status(422).json(formattedErrors);
        return;
      }
      const user = await userServices.updateUser(param.id, data);
      res.status(200).json(user);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  }
);

export const FindManyUsers = asyncHandler(
  async (req: Request, res: Response) => {
    try {
      const data = plainToInstance(FindManyUser, req.query);
      const errors = await validate(data);

      if (errors.length > 0) {
        const formattedErrors = errors.map((error) => ({
          property: error.property,
          message: error.constraints,
        }));
        res.status(422).json(formattedErrors);
        return;
      }

      const users = await userServices.findMany(data);
      res.status(200).json(users);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  }
);

export const FindSingleUser = asyncHandler(
  async (req: Request, res: Response) => {
    try {
      const query = plainToInstance(FindOneUser, req.query);
      const errors = await validate(query);
      if (errors.length > 0) {
        const formattedErrors = errors.map((error) => ({
          property: error.property,
          message: error.constraints,
        }));
        res.status(422).json(formattedErrors);
        return;
      }
      const user = await userServices.findOne(query);
      res.status(200).json(user);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  }
);

export const DeleteSingleUser = asyncHandler(
  async (req: Request, res: Response) => {
    try {
      const param = plainToInstance(Param, req.params);
      const paramError = await validate(param);
      if (paramError.length > 0) {
        const formattedErrors = paramError.map((error) => ({
          property: error.property,
          message: error.constraints,
        }));
        res.status(422).json(formattedErrors);
        return;
      }
      await userServices.deleteUser(param.id);
      res
        .status(200)
        .json({ message: `User with id ${param.id} has been deleted` });
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  }
);
