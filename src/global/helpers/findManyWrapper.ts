import { db } from "../database";
import { FindManyWrapperOptions, pagination } from "../entity";
import { Logger } from "./logger";

const logger = new Logger("FindManyWrapper");
export const findManyWrapper = async <T>(
  tableName: string,
  options: FindManyWrapperOptions = {}
): Promise<{
  data: T[];
  pagination: pagination;
}> => {
  const {
    filters = {},
    joins = [],
    columns = ["*"],
    orderBy = [],
    page = 1,
    limit = 10,
  } = options;

  try {
    let query = db(tableName).select(columns);

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

    const totalRecordsQuery: any = db(tableName).count("* as count");
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
  } catch (error) {
    logger.error({ error });
    throw error;
  }
};
