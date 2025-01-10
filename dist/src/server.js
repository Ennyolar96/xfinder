"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const helmet_1 = __importDefault(require("helmet"));
require("reflect-metadata");
const dotenv_1 = __importDefault(require("dotenv"));
const routers_1 = require("./routers");
const middleware_1 = require("./global/middleware");
dotenv_1.default.config();
const app = (0, express_1.default)();
const PORT = process.env.PORT || 3005;
app.use((0, cors_1.default)());
app.use((0, helmet_1.default)());
app.use(express_1.default.json());
app.disable("x-powered-by");
app.use(express_1.default.urlencoded({ extended: true }));
app.use(middleware_1.errorHandler);
(0, routers_1.applicationRoutes)(app);
app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
    res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    next();
});
app.use((req, res, next) => {
    const error = new Error("unexpected route! Oh you miss road");
    next(error);
});
app.use((err, req, res, next) => {
    res.status(err.status || 500).json({
        error: {
            message: err.message,
            stack: process.env.NODE_ENV === "development" ? err.stack : null,
        },
    });
    next();
});
app.listen(PORT, () => {
    console.log(`Application start at localhost:${PORT}`);
});
//# sourceMappingURL=server.js.map