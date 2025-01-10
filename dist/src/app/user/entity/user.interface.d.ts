import { findMany, findOne, pagination } from "@/global/entity";
export declare enum Gender {
    Male = "male",
    Female = "female",
    Other = "other"
}
export declare enum Role {
    student = "student",
    teacher = "teacher",
    admin = "admin",
    super = "superAdmin"
}
export interface Address {
    street: string;
    city: string;
    state: string;
    zipCode: number;
    landmark: string;
    country: string;
}
export declare enum Status {
    active = "active",
    blocked = "blocked",
    suspend = "suspended"
}
export interface User {
    id?: string;
    firstName: string;
    lastName: string;
    middleName?: string;
    username?: string;
    email: string;
    phoneNumber: string;
    password: string;
    role?: Role;
    birthDate?: Date;
    address?: Address;
    hobbies?: string[];
    language?: string;
    educationLevel?: string;
    nationality?: string;
    gender?: Gender;
    profilePicture?: string;
    verified?: boolean;
    token?: string;
    expTime?: Date;
    status?: Status;
    lastLogin?: Date;
    createdAt?: Date;
    updatedAt?: Date;
}
export interface updateUser extends Partial<User> {
}
export interface findManyUser extends findMany {
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
export interface findManyResponse {
    data: User[];
    pagination: pagination;
}
export interface findOneUser extends findOne {
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
