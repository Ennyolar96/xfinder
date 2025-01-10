import { db, modelName } from "@/global/database";
import {
  forgetPassword,
  loginUser,
  registerUser,
  resetPassword,
  verifyOtp,
} from "./entity";
import * as argon from "argon2";
import { User } from "../user/entity";
import { AuthToken, Logger } from "@/global/helpers";
import jwt from "jsonwebtoken";

const logger = new Logger("auth");
export class AuthServices {
  async createNewUser(data: registerUser): Promise<User> {
    try {
      const existingUser = await db(modelName.user)
        .where({ email: data.email, phoneNumber: data.phoneNumber })
        .first();

      if (existingUser) {
        throw new Error("Email or phone number already registered");
      }

      //TODO   check if user have verified the email else resend the verification link

      const auth_token = AuthToken();
      const hashedPassword = await this.hashPassword(data.password);
      const username = data.email.split("@")[0];

      await db(modelName.user).insert({
        ...data,
        username,
        password: hashedPassword,
        token: auth_token,
        exp_time: new Date(Date.now() + 3600000),
      });
      const user = await db(modelName.user).where({ username }).first();
      delete user.password;

      return user;
    } catch (error) {
      logger.error({ error });
      throw error;
    }
  }

  async authenticateUser(data: loginUser): Promise<User> {
    try {
      const user = await db(modelName.user)
        .where({ email: data.email })
        .first();

      if (!user) {
        throw new Error("User not found");
      }
      const auth_token = AuthToken();
      //   TODO check if user have verified his/her email else send verification mail
      // TODO check if user status is still active
      //   TODO change the token and expTime

      const isMatch = await argon.verify(user.password, data.password);

      if (!isMatch) {
        throw new Error("Invalid credentials");
      }

      const token = await this.assignToken(user);

      delete user.password;
      return { ...user, token };
    } catch (error) {
      throw error;
    }
  }

  async forgetPassword(data: forgetPassword): Promise<void> {
    try {
      const user = await db(modelName.user)
        .where({ email: data.email })
        .first();

      if (!user) {
        throw new Error("User not found");
      }

      // TODO send verification email
    } catch (error) {
      throw error;
    }
  }

  async resetPassword(data: resetPassword): Promise<string> {
    try {
      const user = await db(modelName.user)
        .where({ email: data.email })
        .first();

      if (!user) {
        throw new Error("User not found");
      }

      const hashedPassword = await this.hashPassword(data.password);

      await db(modelName.user)
        .where({ email: data.email })
        .update({ password: hashedPassword });
      return "Password updated";
    } catch (error) {
      throw error;
    }
  }

  async verifyEmail(data: verifyOtp): Promise<string> {
    try {
      const user = await db(modelName.user)
        .where({ email: data.email, token: data.token })
        .first();

      if (!user) {
        throw new Error("Invalid token");
      }

      if (user.expTime > new Date()) {
        throw new Error("Token expired");
      }
      await db(modelName.user)
        .where({ email: user.email })
        .update({ verified: true, token: null });
      return "Email verified";
    } catch (error) {
      throw error;
    }
  }

  private async hashPassword(password: string): Promise<string> {
    try {
      return argon.hash(password);
    } catch (error) {
      throw error;
    }
  }

  private async assignToken(data: { email: string; id: string }) {
    try {
      const token = jwt.sign(
        { id: data.id, email: data.email },
        process.env.JWT_SECRET,
        { expiresIn: "1h" }
      );
      return token;
    } catch (error) {
      throw error;
    }
  }
}
