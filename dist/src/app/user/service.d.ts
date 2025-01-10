import { findManyResponse, findManyUser, findOneUser, updateUser, User } from "./entity";
export declare class UserServices {
    updateUser(id: string, data: updateUser): Promise<User | null>;
    findOne(query: findOneUser): Promise<User | null>;
    findMany(query: findManyUser): Promise<findManyResponse>;
    deleteUser(id: string): Promise<string>;
    private filterOneUser;
    private filterManyUser;
}
