"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserServices = void 0;
const database_1 = require("@/global/database");
const helpers_1 = require("@/global/helpers");
const logger = new helpers_1.Logger("user");
class UserServices {
    async updateUser(id, data) {
        try {
            await (0, database_1.db)(database_1.modelName.user).where("id", id).update(data, ["id"]);
            const user = await (0, database_1.db)(database_1.modelName.user).where({ id }).first();
            return (0, helpers_1.sanitizeSensitiveFields)(user);
        }
        catch (error) {
            throw error;
        }
    }
    async findOne(query) {
        try {
            const { filters, joins, columns, orderBy } = this.filterOneUser(query);
            logger.info({ filters, joins, columns, orderBy });
            const user = await (0, helpers_1.findOneWrapper)(database_1.modelName.user, {
                filters,
                joins,
                columns,
                orderBy,
            });
            return (0, helpers_1.sanitizeSensitiveFields)(user);
        }
        catch (error) {
            throw error;
        }
    }
    async findMany(query) {
        try {
            const { filters, joins, columns, orderBy, limit, page } = this.filterManyUser(query);
            logger.info({ filters, joins, columns, orderBy, limit, page });
            const users = await (0, helpers_1.findManyWrapper)(database_1.modelName.user, {
                filters,
                joins,
                columns,
                orderBy,
                limit,
                page,
            });
            const result = (0, helpers_1.sanitizeSensitiveFields)(users.data);
            return { ...users, data: result };
        }
        catch (error) {
            throw error;
        }
    }
    async deleteUser(id) {
        try {
            await (0, database_1.db)(database_1.modelName.user).where("id", id).delete();
            return "User deleted successfully";
        }
        catch (error) {
            throw error;
        }
    }
    filterOneUser(query) {
        logger.info({ findOneQuery: query });
        const { include, sort, select, ...filters } = query;
        const joins = [];
        const orderBy = [];
        const column = [];
        if (include) {
            include.forEach((item) => joins.push({
                table: item,
                on: [`${item}.${database_1.modelName.user}`, `${database_1.modelName.user}.id`],
            }));
        }
        if (sort) {
            sort.map((item) => orderBy.push({
                column: item,
                direction: "desc",
            }));
        }
        if (select) {
            select.map((item) => {
                const parts = item.split(".");
                if (parts.length === 2) {
                    const camelCaseKey = `${parts[0]}${parts[1][0].toUpperCase()}${parts[1].slice(1)}`;
                    column.push(`${item} as ${camelCaseKey}`);
                }
                else {
                    column.push(item);
                }
            });
        }
        const columns = ["*"].concat(column);
        return { filters, joins, columns, orderBy };
    }
    filterManyUser(query) {
        logger.info({ findManyQuery: query });
        const { include, sort, select, page, limit, ...filters } = query;
        const joins = [];
        const orderBy = [];
        const column = [];
        if (include) {
            include.forEach((item) => joins.push({
                table: item,
                on: [`${item}.${database_1.modelName.user}`, `${database_1.modelName.user}.id`],
            }));
        }
        if (sort) {
            sort.map((item) => orderBy.push({
                column: item,
                direction: "desc",
            }));
        }
        if (select) {
            select.map((item) => {
                const parts = item.split(".");
                if (parts.length === 2) {
                    const camelCaseKey = `${parts[0]}${parts[1][0].toUpperCase()}${parts[1].slice(1)}`;
                    column.push(`${item} as ${camelCaseKey}`);
                }
                else {
                    column.push(item);
                }
            });
        }
        const columns = ["*"].concat(column);
        return { filters, joins, columns, orderBy, page, limit };
    }
}
exports.UserServices = UserServices;
//# sourceMappingURL=service.js.map