import { Address, findManyUser, findOneUser, Gender, Role, Status, updateUser } from "./user.interface";
import { FindMany, FindOne } from "@/global/entity";
export declare class UpdateUser implements updateUser {
    firstName: string;
    lastName: string;
    middleName?: string;
    username?: string;
    phoneNumber: string;
    birthDate?: Date;
    address?: Address;
    hobbies?: string[];
    language?: string;
    educationLevel?: string;
    nationality?: string;
    gender?: Gender;
    profilePicture?: string;
}
export declare class FindManyUser extends FindMany implements findManyUser {
    role?: Role[];
    birthDate?: Date[];
    hobbies?: string[];
    language?: string[];
    educationLevel?: string[];
    nationality?: string[];
    gender?: Gender[];
    verified?: boolean[];
    status?: Status[];
}
export declare class FindOneUser extends FindOne implements findOneUser {
    role?: Role;
    birthDate?: Date;
    hobbies?: string[];
    language?: string;
    educationLevel?: string;
    nationality?: string;
    gender?: Gender;
    verified?: boolean;
    status?: Status;
}
export declare class Param {
    id: string;
}
