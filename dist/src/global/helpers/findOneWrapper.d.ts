import { findOneWrapperOptions } from "../entity";
export declare const findOneWrapper: <T>(tableName: string, options?: findOneWrapperOptions) => Promise<T | null>;
