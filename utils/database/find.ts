import { Bill } from "@/entities/Bill";
import * as SQLite from "expo-sqlite";

export const getBillsStatement = async (db: SQLite.SQLiteDatabase) => {
  const statement = await db.prepareAsync(
    "SELECT * FROM bill ORDER BY dueDate DESC"
  );

  return {
    execute: async () => (await statement.executeAsync()).getAllAsync(),
    statement,
  };
};

type FilteredBillsArgs<K extends keyof Bill> = {
  where: Record<K, Bill[K]>;
  orderBy?: { field: keyof Bill; order: "ASC" | "DESC" };
};

export const getFilteredBillsStatement = async <K extends keyof Bill>(
  db: SQLite.SQLiteDatabase,
  { where, orderBy }: FilteredBillsArgs<K>
) => {
  const columnName = Object.keys(where)[0];
  const value = where[columnName as K] as any;

  const statement = await db.prepareAsync(
    `SELECT * FROM bill WHERE ${columnName} = $value ORDER BY ${
      orderBy?.field || "dueDate"
    } ${orderBy?.order || "DESC"}`
  );

  return {
    execute: async () =>
      (await statement.executeAsync({ $value: value })).getAllAsync(),
    statement,
  };
};

export const getCurrentMonthBillsStatement = async (
  db: SQLite.SQLiteDatabase,
  month: number
) => {
  const statement = await db.prepareAsync(
    "SELECT * FROM bill WHERE CAST(strftime('%m', dueDate) as INT) = $month ORDER BY dueDate ASC"
  );

  return {
    execute: async () =>
      (await statement.executeAsync({ $month: month })).getAllAsync(),
    statement,
  };
};
