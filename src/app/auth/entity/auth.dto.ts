import {
  IsEmail,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
} from "class-validator";
import {
  forgetPassword,
  loginUser,
  registerUser,
  resendOtp,
  resetPassword,
  verifyOtp,
} from "./auth.interface";
import { Transform } from "class-transformer";

export class RegisterUser implements registerUser {
  @IsString()
  @IsEmail()
  @Transform(({ value }) => value.trim())
  email: string;

  @IsString()
  @IsNotEmpty()
  @Transform(({ value }) => value.trim())
  firstName: string;

  @IsString()
  @IsNotEmpty()
  @Transform(({ value }) => value.trim())
  lastName: string;

  @IsString()
  @IsOptional()
  @Transform(({ value }) => value.trim())
  middleName?: string;

  @IsString()
  @IsNotEmpty()
  @Transform(({ value }) => value.trim())
  password: string;

  @IsInt()
  @Transform(({ value }) => parseInt(value))
  phoneNumber: string;
}

export class LoginUser implements loginUser {
  @IsString()
  @IsEmail()
  @Transform(({ value }) => value.trim())
  email: string;

  @IsString()
  @IsNotEmpty()
  @Transform(({ value }) => value.trim())
  password: string;
}

export class ForgetPassword implements forgetPassword {
  @IsString()
  @IsEmail()
  @Transform(({ value }) => value.trim())
  email: string;
}

export class ResetPassword implements resetPassword {
  @IsString()
  @IsEmail()
  @Transform(({ value }) => value.trim())
  email: string;

  @IsString()
  @IsNotEmpty()
  @Transform(({ value }) => value.trim())
  password: string;
}

export class VerifyOtp implements verifyOtp {
  @IsString()
  @IsEmail()
  @Transform(({ value }) => value.trim())
  email: string;

  @IsString()
  @IsNotEmpty()
  @Transform(({ value }) => value.trim())
  token?: string;
}

export class ResendOtp implements resendOtp {
  @IsString()
  @IsEmail()
  @Transform(({ value }) => value.trim())
  email: string;
}
