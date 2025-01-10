import { User } from "@/app/user/entity";
import { Request } from "express";

export interface findOne {
  id?: string;
  include?: Array<String>;
  sort?: string[];
  select?: string[];
}

export interface findMany {
  include?: Array<String>;
  sort?: string[];
  select?: string[];
  limit?: number;
  page?: number;
}

type joinType = "inner" | "left" | "right" | "full";

export interface findOneWrapperOptions {
  filters?: Record<string, any>;
  joins?: JoinDefinition[];
  columns?: string[];
  orderBy?: OrderByDefinition[];
  limit?: number;
  offset?: number;
}

export interface JoinDefinition {
  table: string;
  on: [string, string];
  type?: joinType;
}

export interface OrderByDefinition {
  column: string;
  direction?: "asc" | "desc";
}

export interface FindManyWrapperOptions {
  filters?: Record<string, any>;
  joins?: JoinDefinition[];
  columns?: string[];
  orderBy?: OrderByDefinition[];
  page?: number;
  limit?: number;
}

export interface pagination {
  currentPage: number;
  totalPages: number;
  hasNext: boolean;
  hasPrevious: boolean;
  totalRecords: number;
  limit: number;
}

export interface AuthRequest extends Request {
  user: User;
}
