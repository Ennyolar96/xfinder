"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SignInUser = exports.CreateNewUser = void 0;
const class_transformer_1 = require("class-transformer");
const class_validator_1 = require("class-validator");
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const entity_1 = require("./entity");
const service_1 = require("./service");
const authServices = new service_1.AuthServices();
exports.CreateNewUser = (0, express_async_handler_1.default)(async (req, res) => {
    try {
        const data = (0, class_transformer_1.plainToInstance)(entity_1.RegisterUser, req.body);
        const errors = await (0, class_validator_1.validate)(data);
        if (errors.length > 0) {
            const formattedErrors = errors.map((error) => ({
                property: error.property,
                message: error.constraints,
            }));
            res.status(422).json(formattedErrors);
            return;
        }
        const user = await authServices.createNewUser(data);
        res.status(201).json(user);
    }
    catch (error) {
        res.status(400).json({ message: error.message });
    }
});
exports.SignInUser = (0, express_async_handler_1.default)(async (req, res) => {
    try {
        const data = (0, class_transformer_1.plainToInstance)(entity_1.LoginUser, req.body);
        const errors = await (0, class_validator_1.validate)(data);
        if (errors.length > 0) {
            const formattedErrors = errors.map((error) => ({
                property: error.property,
                message: error.constraints,
            }));
            res.status(422).json(formattedErrors);
            return;
        }
        const user = await authServices.authenticateUser(data);
        res.status(200).json(user);
    }
    catch (error) {
        res.status(400).json({ message: error.message });
    }
});
//# sourceMappingURL=controller.js.map