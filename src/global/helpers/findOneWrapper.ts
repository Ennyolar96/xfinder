import { db } from "../database";
import { findOneWrapperOptions } from "../entity";
import { Logger } from "./logger";

const logger = new Logger("findOneWrapper");
export const findOneWrapper = async <T>(
  tableName: string,
  options: findOneWrapperOptions = {}
): Promise<T | null> => {
  const {
    filters = {},
    joins = [],
    columns = ["*"],
    orderBy = [],
    limit = 1,
    offset = 0,
  } = options;

  try {
    let query = db(tableName).select(columns);

    // Apply joins
    joins.forEach(({ table, on, type = "inner" }) => {
      query = query.join(table, on[0], on[1], type);
    });

    // Apply filters
    if (Object.keys(filters).length > 0) {
      query = query.where(filters);
    }

    // Apply ordering
    orderBy.forEach(({ column, direction = "asc" }) => {
      query = query.orderBy(column, direction);
    });

    // Apply limit and offset
    if (limit) query = query.limit(limit);
    if (offset) query = query.offset(offset);

    // Execute the query and return the first result or null if not found.
    const result = await query.first();
    logger.info({ result });
    return result || null;
  } catch (error) {
    logger.error({ error });
    throw error;
  }
};
