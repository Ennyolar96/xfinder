"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.applicationRoutes = void 0;
const auth_1 = __importDefault(require("./auth"));
const user_1 = __importDefault(require("./user"));
const applicationRoutes = (app) => {
    [auth_1.default, user_1.default].forEach((route) => {
        app.use("/api", route);
    });
};
exports.applicationRoutes = applicationRoutes;
//# sourceMappingURL=index.js.map