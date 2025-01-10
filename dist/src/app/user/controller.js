"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeleteSingleUser = exports.FindSingleUser = exports.FindManyUsers = exports.UpdateSingleUser = void 0;
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const service_1 = require("./service");
const class_transformer_1 = require("class-transformer");
const entity_1 = require("./entity");
const class_validator_1 = require("class-validator");
const userServices = new service_1.UserServices();
exports.UpdateSingleUser = (0, express_async_handler_1.default)(async (req, res) => {
    try {
        const param = (0, class_transformer_1.plainToInstance)(entity_1.Param, req.params);
        const paramError = await (0, class_validator_1.validate)(param);
        if (paramError.length > 0) {
            const formattedErrors = paramError.map((error) => ({
                property: error.property,
                message: error.constraints,
            }));
            res.status(422).json(formattedErrors);
            return;
        }
        const data = (0, class_transformer_1.plainToInstance)(entity_1.UpdateUser, req.body);
        const errors = await (0, class_validator_1.validate)(data);
        if (errors.length > 0) {
            const formattedErrors = errors.map((error) => ({
                property: error.property,
                message: error.constraints,
            }));
            res.status(422).json(formattedErrors);
            return;
        }
        const user = await userServices.updateUser(param.id, data);
        res.status(200).json(user);
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
});
exports.FindManyUsers = (0, express_async_handler_1.default)(async (req, res) => {
    try {
        const data = (0, class_transformer_1.plainToInstance)(entity_1.FindManyUser, req.query);
        const errors = await (0, class_validator_1.validate)(data);
        if (errors.length > 0) {
            const formattedErrors = errors.map((error) => ({
                property: error.property,
                message: error.constraints,
            }));
            res.status(422).json(formattedErrors);
            return;
        }
        const users = await userServices.findMany(data);
        res.status(200).json(users);
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
});
exports.FindSingleUser = (0, express_async_handler_1.default)(async (req, res) => {
    try {
        const query = (0, class_transformer_1.plainToInstance)(entity_1.FindOneUser, req.query);
        const errors = await (0, class_validator_1.validate)(query);
        if (errors.length > 0) {
            const formattedErrors = errors.map((error) => ({
                property: error.property,
                message: error.constraints,
            }));
            res.status(422).json(formattedErrors);
            return;
        }
        const user = await userServices.findOne(query);
        res.status(200).json(user);
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
});
exports.DeleteSingleUser = (0, express_async_handler_1.default)(async (req, res) => {
    try {
        const param = (0, class_transformer_1.plainToInstance)(entity_1.Param, req.params);
        const paramError = await (0, class_validator_1.validate)(param);
        if (paramError.length > 0) {
            const formattedErrors = paramError.map((error) => ({
                property: error.property,
                message: error.constraints,
            }));
            res.status(422).json(formattedErrors);
            return;
        }
        await userServices.deleteUser(param.id);
        res
            .status(200)
            .json({ message: `User with id ${param.id} has been deleted` });
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
});
//# sourceMappingURL=controller.js.map