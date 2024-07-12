import { Bill } from "@/entities/Bill";
import * as SQLite from "expo-sqlite";

type FilteredByParams<T extends object, K extends keyof T> = {
  where: Partial<T>;
  orderBy?: { field: K; order: "ASC" | "DESC" };
};

type CurrentMonthParams = {
  column: string;
  month: number;
};

export const getStatement = async (
  db: SQLite.SQLiteDatabase,
  tablename: string
) => {
  const statement = await db.prepareAsync(
    `SELECT * FROM ${tablename} ORDER BY dueDate DESC`
  );

  return {
    execute: async () => (await statement.executeAsync()).getAllAsync(),
    statement,
  };
};

export const getFilteredByStatement = async <T extends object>(
  db: SQLite.SQLiteDatabase,
  tablename: string,
  { where, orderBy }: FilteredByParams<T, keyof T>
) => {
  const columnName = Object.keys(where)[0];
  const value = where[columnName as keyof T] as any;

  const statement = await db.prepareAsync(
    `SELECT * FROM ${tablename} WHERE ${columnName} = $value ORDER BY ${
      orderBy?.field as string
    } ${orderBy?.order || "DESC"}`
  );

  return {
    execute: async () =>
      (await statement.executeAsync({ $value: value })).getAllAsync(),
    statement,
  };
};

export const getCurrentMonthStatement = async <T>(
  db: SQLite.SQLiteDatabase,
  tablename: string,
  { column, month }: CurrentMonthParams
) => {
  const statement = await db.prepareAsync(
    `SELECT * FROM ${tablename} WHERE CAST(strftime('%m', ${column}) as INT) = $month ORDER BY ${column} ASC`
  );

  return {
    execute: async () =>
      (
        await statement.executeAsync({ $month: month })
      ).getAllAsync() as Promise<T[]>,
    statement,
  };
};
