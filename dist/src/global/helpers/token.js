"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthToken = AuthToken;
function AuthToken() {
    return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
}
//# sourceMappingURL=token.js.map