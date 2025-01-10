import { User } from "@/app/user/entity";

export interface registerUser
  extends Pick<
    User,
    | "email"
    | "firstName"
    | "lastName"
    | "password"
    | "phoneNumber"
    | "middleName"
  > {}

export interface loginUser extends Pick<User, "email" | "password"> {}

export interface forgetPassword extends Pick<loginUser, "email"> {}

export interface resetPassword extends Pick<loginUser, "email" | "password"> {}

export interface verifyOtp extends Pick<User, "email" | "token"> {}

export interface resendOtp extends Pick<User, "email"> {}
