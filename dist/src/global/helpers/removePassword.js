"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sanitizeSensitiveFields = void 0;
const sanitizeSensitiveFields = (data) => {
    const removePassword = (record) => {
        if (record &&
            typeof record === "object" &&
            !Array.isArray(record) &&
            "password" in record) {
            const { password, ...rest } = record;
            return rest;
        }
        return record;
    };
    if (Array.isArray(data)) {
        return data.map((item) => Array.isArray(item) ? item.map(removePassword) : removePassword(item));
    }
    return removePassword(data);
};
exports.sanitizeSensitiveFields = sanitizeSensitiveFields;
//# sourceMappingURL=removePassword.js.map