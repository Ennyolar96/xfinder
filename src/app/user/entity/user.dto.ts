import { Transform, Type } from "class-transformer";
import {
  IsBoolean,
  IsDate,
  IsIn,
  IsInt,
  IsObject,
  IsOptional,
  IsString,
  IsUrl,
  IsUUID,
  ValidateNested,
} from "class-validator";
import {
  Address,
  findManyUser,
  findOneUser,
  Gender,
  Role,
  Status,
  updateUser,
} from "./user.interface";
import { FindMany, FindOne } from "@/global/entity";

class address implements Address {
  @IsOptional()
  @IsString()
  @Transform(({ value }) => value.trim())
  street: string;

  @IsOptional()
  @IsString()
  @Transform(({ value }) => value.trim())
  city: string;

  @IsOptional()
  @IsString()
  @Transform(({ value }) => value.trim())
  state: string;

  @IsInt()
  @IsOptional()
  @Transform(({ value }) => parseInt(value))
  zipCode: number;

  @IsString()
  @IsOptional()
  @Transform(({ value }) => value.trim())
  landmark: string;

  @IsString()
  @IsOptional()
  @Transform(({ value }) => value.trim())
  country: string;
}

export class UpdateUser implements updateUser {
  @IsString()
  @IsOptional()
  @Transform(({ value }) => value.trim())
  firstName: string;

  @IsString()
  @IsOptional()
  @Transform(({ value }) => value.trim())
  lastName: string;

  @IsString()
  @IsOptional()
  @Transform(({ value }) => value.trim())
  middleName?: string;

  @IsString()
  @IsOptional()
  @Transform(({ value }) => value.trim())
  username?: string;

  @IsInt()
  @IsOptional()
  @Transform(({ value }) => parseInt(value))
  phoneNumber: string;

  @IsDate()
  @IsOptional()
  @Transform(({ value }) => new Date(value))
  birthDate?: Date;

  @IsObject()
  @IsOptional()
  @Type(() => address)
  @ValidateNested()
  address?: Address;

  @IsString({ each: true })
  @IsOptional()
  hobbies?: string[];

  @IsString()
  @IsOptional()
  @Transform(({ value }) => value.trim())
  language?: string;

  @IsString()
  @IsOptional()
  @Transform(({ value }) => value.trim())
  educationLevel?: string;

  @IsString()
  @IsOptional()
  @Transform(({ value }) => value.trim())
  nationality?: string;

  @IsOptional()
  @IsIn([Gender])
  @Transform(({ value }) => Gender[value])
  gender?: Gender;

  @IsUrl()
  @IsOptional()
  @Transform(({ value }) => value.trim())
  profilePicture?: string;
}

export class FindManyUser extends FindMany implements findManyUser {
  @IsOptional()
  @IsIn([Role])
  @Transform(({ value }) => (typeof value === "string" ? [value] : value))
  role?: Role[];

  @IsOptional()
  @IsDate({ each: true })
  @Transform(({ value }) => new Date(value))
  @Transform(({ value }) => (typeof value === "string" ? [value] : value))
  birthDate?: Date[];

  @IsString({ each: true })
  @IsOptional()
  hobbies?: string[];

  @IsString({ each: true })
  @IsOptional()
  @Transform(({ value }) => (typeof value === "string" ? [value] : value))
  language?: string[];

  @IsString({ each: true })
  @IsOptional()
  @Transform(({ value }) => (typeof value === "string" ? [value] : value))
  educationLevel?: string[];

  @IsString({ each: true })
  @IsOptional()
  @Transform(({ value }) => (typeof value === "string" ? [value] : value))
  nationality?: string[];

  @IsOptional()
  @IsIn([Gender])
  @Transform(({ value }) => (typeof value === "string" ? [value] : value))
  gender?: Gender[];

  @IsBoolean()
  @IsOptional()
  @Transform(({ value }) => (value === "true" ? true : false))
  verified?: boolean[];

  @IsString({ each: true })
  @IsOptional()
  @IsIn([Status])
  @Transform(({ value }) => (typeof value === "string" ? [value] : value))
  status?: Status[];
}

export class FindOneUser extends FindOne implements findOneUser {
  @IsOptional()
  @IsIn([Role])
  @Transform(({ value }) => value.trim())
  role?: Role;

  @IsOptional()
  @IsDate()
  @Transform(({ value }) => new Date(value))
  birthDate?: Date;

  @IsString()
  @IsOptional()
  hobbies?: string[];

  @IsString()
  @IsOptional()
  @Transform(({ value }) => value.trim())
  language?: string;

  @IsString()
  @IsOptional()
  @Transform(({ value }) => value.trim())
  educationLevel?: string;

  @IsString()
  @IsOptional()
  nationality?: string;

  @IsOptional()
  @IsIn([Gender])
  @Transform(({ value }) => value.trim())
  gender?: Gender;

  @IsBoolean()
  @IsOptional()
  @Transform(({ value }) => (value === "true" ? true : false))
  verified?: boolean;

  @IsString({ each: true })
  @IsOptional()
  @IsIn([Status])
  @Transform(({ value }) => value.trim())
  status?: Status;
}

export class Param {
  @IsString()
  @IsUUID()
  id: string;
}
