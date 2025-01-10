"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthServices = void 0;
const database_1 = require("@/global/database");
const argon = __importStar(require("argon2"));
const helpers_1 = require("@/global/helpers");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const logger = new helpers_1.Logger("auth");
class AuthServices {
    async createNewUser(data) {
        try {
            const existingUser = await (0, database_1.db)(database_1.modelName.user)
                .where({ email: data.email, phoneNumber: data.phoneNumber })
                .first();
            if (existingUser) {
                throw new Error("Email or phone number already registered");
            }
            const auth_token = (0, helpers_1.AuthToken)();
            const hashedPassword = await this.hashPassword(data.password);
            const username = data.email.split("@")[0];
            await (0, database_1.db)(database_1.modelName.user).insert({
                ...data,
                username,
                password: hashedPassword,
                token: auth_token,
                exp_time: new Date(Date.now() + 3600000),
            });
            const user = await (0, database_1.db)(database_1.modelName.user).where({ username }).first();
            delete user.password;
            return user;
        }
        catch (error) {
            logger.error({ error });
            throw error;
        }
    }
    async authenticateUser(data) {
        try {
            const user = await (0, database_1.db)(database_1.modelName.user)
                .where({ email: data.email })
                .first();
            if (!user) {
                throw new Error("User not found");
            }
            const auth_token = (0, helpers_1.AuthToken)();
            const isMatch = await argon.verify(user.password, data.password);
            if (!isMatch) {
                throw new Error("Invalid credentials");
            }
            const token = await this.assignToken(user);
            delete user.password;
            return { ...user, token };
        }
        catch (error) {
            throw error;
        }
    }
    async forgetPassword(data) {
        try {
            const user = await (0, database_1.db)(database_1.modelName.user)
                .where({ email: data.email })
                .first();
            if (!user) {
                throw new Error("User not found");
            }
        }
        catch (error) {
            throw error;
        }
    }
    async resetPassword(data) {
        try {
            const user = await (0, database_1.db)(database_1.modelName.user)
                .where({ email: data.email })
                .first();
            if (!user) {
                throw new Error("User not found");
            }
            const hashedPassword = await this.hashPassword(data.password);
            await (0, database_1.db)(database_1.modelName.user)
                .where({ email: data.email })
                .update({ password: hashedPassword });
            return "Password updated";
        }
        catch (error) {
            throw error;
        }
    }
    async verifyEmail(data) {
        try {
            const user = await (0, database_1.db)(database_1.modelName.user)
                .where({ email: data.email, token: data.token })
                .first();
            if (!user) {
                throw new Error("Invalid token");
            }
            if (user.expTime > new Date()) {
                throw new Error("Token expired");
            }
            await (0, database_1.db)(database_1.modelName.user)
                .where({ email: user.email })
                .update({ verified: true, token: null });
            return "Email verified";
        }
        catch (error) {
            throw error;
        }
    }
    async hashPassword(password) {
        try {
            return argon.hash(password);
        }
        catch (error) {
            throw error;
        }
    }
    async assignToken(data) {
        try {
            const token = jsonwebtoken_1.default.sign({ id: data.id, email: data.email }, process.env.JWT_SECRET, { expiresIn: "1h" });
            return token;
        }
        catch (error) {
            throw error;
        }
    }
}
exports.AuthServices = AuthServices;
//# sourceMappingURL=service.js.map