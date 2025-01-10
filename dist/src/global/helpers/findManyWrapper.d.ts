import { FindManyWrapperOptions, pagination } from "../entity";
export declare const findManyWrapper: <T>(tableName: string, options?: FindManyWrapperOptions) => Promise<{
    data: T[];
    pagination: pagination;
}>;
