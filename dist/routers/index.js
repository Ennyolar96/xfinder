"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.applicationRoutes = void 0;
const applicationRoutes = (app) => {
    [].forEach((route) => {
        app.use("/api/", route);
    });
};
exports.applicationRoutes = applicationRoutes;
//# sourceMappingURL=index.js.map