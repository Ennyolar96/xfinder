"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.findManyWrapper = void 0;
const database_1 = require("../database");
const logger_1 = require("./logger");
const logger = new logger_1.Logger("FindManyWrapper");
const findManyWrapper = async (tableName, options = {}) => {
    const { filters = {}, joins = [], columns = ["*"], orderBy = [], page = 1, limit = 10, } = options;
    try {
        let query = (0, database_1.db)(tableName).select(columns);
        joins.forEach(({ table, on, type = "inner" }) => {
            query = query.join(table, on[0], on[1], type);
        });
        if (Object.keys(filters).length > 0) {
            query = query.where(filters);
        }
        orderBy.forEach(({ column, direction = "asc" }) => {
            query = query.orderBy(column, direction);
        });
        const offset = (page - 1) * limit;
        const totalRecordsQuery = (0, database_1.db)(tableName).count("* as count");
        if (Object.keys(filters).length > 0) {
            totalRecordsQuery.where(filters);
        }
        const [{ count: totalRecords }] = await totalRecordsQuery;
        const data = await query.limit(limit).offset(offset);
        const totalPages = Math.ceil(totalRecords / limit);
        const hasNext = page < totalPages;
        const hasPrevious = page > 1;
        const result = {
            data,
            pagination: {
                currentPage: page,
                totalPages,
                hasNext,
                hasPrevious,
                totalRecords: Number(totalRecords),
                limit,
            },
        };
        logger.info({ result });
        return result;
    }
    catch (error) {
        logger.error({ error });
        throw error;
    }
};
exports.findManyWrapper = findManyWrapper;
//# sourceMappingURL=findManyWrapper.js.map