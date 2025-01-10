export declare class Logger {
    context: string;
    constructor(context: string);
    info(message: any, ...optionalParams: any): void;
    warn(message: any, ...optionalParams: any): void;
    error(message: any, errorStack?: string, ...optionalParams: any): void;
    debug(message: any, ...optionalParams: any): void;
}
