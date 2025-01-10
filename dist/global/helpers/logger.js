"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Logger = void 0;
const chalk_1 = __importDefault(require("chalk"));
function getTimestamp() {
    return new Date().toISOString();
}
class Logger {
    constructor(context) {
        this.context = context || "Application";
    }
    info(message, ...optionalParams) {
        console.log(chalk_1.default.blue(`[INFO] [${getTimestamp()}] [${this.context}]`, message, ...optionalParams));
    }
    warn(message, ...optionalParams) {
        console.log(chalk_1.default.yellow(`[WARN] [${getTimestamp()}] [${this.context}]`, message, ...optionalParams));
    }
    error(message, errorStack = "", ...optionalParams) {
        console.log(chalk_1.default.red(`[ERROR] [${getTimestamp()}] [${this.context}]`, message, ...optionalParams));
        if (errorStack) {
            console.log(chalk_1.default.red(errorStack));
        }
    }
    debug(message, ...optionalParams) {
        if (process.env.NODE_ENV === "development") {
            console.log(chalk_1.default.gray(`[DEBUG] [${getTimestamp()}] [${this.context}]`, message, ...optionalParams));
        }
    }
}
exports.Logger = Logger;
//# sourceMappingURL=logger.js.map