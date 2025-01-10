import { db, modelName } from "@/global/database";
import {
  FindManyWrapperOptions,
  findOneWrapperOptions,
  JoinDefinition,
  OrderByDefinition,
} from "@/global/entity";
import {
  findManyWrapper,
  findOneWrapper,
  Logger,
  sanitizeSensitiveFields,
} from "@/global/helpers";
import {
  findManyResponse,
  findManyUser,
  findOneUser,
  updateUser,
  User,
} from "./entity";

const logger = new Logger("user");
export class UserServices {
  async updateUser(id: string, data: updateUser): Promise<User | null> {
    try {
      await db(modelName.user).where("id", id).update(data, ["id"]);
      const user = await db(modelName.user).where({ id }).first();
      return sanitizeSensitiveFields(user) as User | null;
    } catch (error) {
      throw error;
    }
  }

  async findOne(query: findOneUser): Promise<User | null> {
    try {
      const { filters, joins, columns, orderBy } = this.filterOneUser(query);
      logger.info({ filters, joins, columns, orderBy });
      const user = await findOneWrapper<User>(modelName.user, {
        filters,
        joins,
        columns,
        orderBy,
      });

      return sanitizeSensitiveFields(user) as User | null;
    } catch (error) {
      throw error;
    }
  }

  async findMany(query: findManyUser): Promise<findManyResponse> {
    try {
      const { filters, joins, columns, orderBy, limit, page } =
        this.filterManyUser(query);
      logger.info({ filters, joins, columns, orderBy, limit, page });
      const users = await findManyWrapper<User>(modelName.user, {
        filters,
        joins,
        columns,
        orderBy,
        limit,
        page,
      });

      const result = sanitizeSensitiveFields(users.data) as User[];
      return { ...users, data: result };
    } catch (error) {
      throw error;
    }
  }

  async deleteUser(id: string): Promise<string> {
    try {
      await db(modelName.user).where("id", id).delete();
      return "User deleted successfully";
    } catch (error) {
      throw error;
    }
  }

  private filterOneUser(query: findOneUser): findOneWrapperOptions {
    logger.info({ findOneQuery: query });
    const { include, sort, select, ...filters } = query;

    const joins: JoinDefinition[] = [];
    const orderBy: OrderByDefinition[] = [];
    const column: string[] = [];

    if (include) {
      include.forEach((item: string) =>
        joins.push({
          table: item,
          on: [`${item}.${modelName.user}`, `${modelName.user}.id`],
        })
      );
    }

    if (sort) {
      sort.map((item: string) =>
        orderBy.push({
          column: item,
          direction: "desc",
        })
      );
    }

    if (select) {
      select.map((item: string) => {
        const parts = item.split(".");

        if (parts.length === 2) {
          const camelCaseKey = `${
            parts[0]
          }${parts[1][0].toUpperCase()}${parts[1].slice(1)}`;
          column.push(`${item} as ${camelCaseKey}`);
        } else {
          column.push(item);
        }
      });
    }
    const columns = ["*"].concat(column);
    return { filters, joins, columns, orderBy };
  }

  private filterManyUser(query: findManyUser): FindManyWrapperOptions {
    logger.info({ findManyQuery: query });
    const { include, sort, select, page, limit, ...filters } = query;

    const joins: JoinDefinition[] = [];
    const orderBy: OrderByDefinition[] = [];
    const column: string[] = [];

    if (include) {
      include.forEach((item: string) =>
        joins.push({
          table: item,
          on: [`${item}.${modelName.user}`, `${modelName.user}.id`],
        })
      );
    }

    if (sort) {
      sort.map((item: string) =>
        orderBy.push({
          column: item,
          direction: "desc",
        })
      );
    }

    if (select) {
      select.map((item: string) => {
        const parts = item.split(".");

        if (parts.length === 2) {
          const camelCaseKey = `${
            parts[0]
          }${parts[1][0].toUpperCase()}${parts[1].slice(1)}`;
          column.push(`${item} as ${camelCaseKey}`);
        } else {
          column.push(item);
        }
      });
    }

    const columns = ["*"].concat(column);
    return { filters, joins, columns, orderBy, page, limit };
  }
}
